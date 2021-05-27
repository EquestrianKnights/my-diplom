using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

using Newtonsoft.Json;

namespace TwilightSparkle.Storage.Firebase
{
    public class FirebaseFileStorage : IFileStorage
    {
        private const string FirebaseStorageEndpoint = "https://firebasestorage.googleapis.com/v0/b/";

        private readonly IFirebaseFileStorageConfiguration _configuration;


        /// <summary>
        /// Creates an instance of <see cref="FirebaseFileStorage"/> class.
        /// </summary>
        /// <param name="storageBucket"> Google storage bucket. E.g. 'your-bucket.appspot.com'.</param>
        public FirebaseFileStorage(IFirebaseFileStorageConfiguration configuration)
        {
            _configuration = configuration;
        }


        public Task<string> UploadAsync(string filename, Stream imageStream, string mimeType, string fileDirectoryFilePath)
        {
            var escapedPath = Uri.EscapeDataString(fileDirectoryFilePath == null ? filename : string.Join("/", fileDirectoryFilePath, filename));
            var targetUrl = $"{FirebaseStorageEndpoint}{_configuration.StorageBucket}/o?name={escapedPath}";
            var downloadUrl = $"{FirebaseStorageEndpoint}{_configuration.StorageBucket}/o/{escapedPath}";

            return UploadAsync(imageStream, targetUrl, downloadUrl, mimeType);
        }

        public async Task<string> UploadAsync(Stream imageStream, string url,
            string downloadUrl, string mimeType)
        {
            string responseData = null;

            try
            {
                using var client = await HttpClientFactory.CreateHttpClientAsync();
                var request = new HttpRequestMessage(HttpMethod.Post, url)
                {
                    Content = new StreamContent(imageStream)
                };

                if (!string.IsNullOrEmpty(mimeType))
                {
                    request.Content.Headers.ContentType = new MediaTypeHeaderValue(mimeType);
                }

                var response = await client.SendAsync(request).ConfigureAwait(false);
                responseData = await response.Content.ReadAsStringAsync().ConfigureAwait(false);

                response.EnsureSuccessStatusCode();
                var data = JsonConvert.DeserializeObject<Dictionary<string, object>>(responseData);

                return $"{downloadUrl}?alt=media&token={data["downloadTokens"]}";
            }
            catch (Exception ex)
            {
                throw new UploadFileException(url, responseData, ex);
            }
        }

        public async Task<byte[]> GetAsync(string url)
        {
            try
            {
                using (var http = await HttpClientFactory.CreateHttpClientAsync())
                {
                    var result = await http.GetAsync(url).ConfigureAwait(false);

                    result.EnsureSuccessStatusCode();

                    return await result.Content.ReadAsByteArrayAsync();
                }
            }
            catch (Exception ex)
            {
                throw new GetFileException(url, "Can't download image", ex);
            }
        }
    }
}

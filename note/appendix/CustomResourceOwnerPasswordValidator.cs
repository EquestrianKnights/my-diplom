using System;
using System.Threading.Tasks;

using IdentityServer4.Models;
using IdentityServer4.Validation;

using Microsoft.Extensions.Logging;

using TwilightSparkle.Common.Hashing.Interfaces;
using TwilightSparkle.DataAccess.Interfaces;
using TwilightSparkle.DomainModel.Authentication;
using TwilightSparkle.IdentityServer.CustomStores.Services;

namespace TwilightSparkle.IdentityServer.CustomStores
{
    public class CustomResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IRepository<User> _userRepository;
        private readonly IOrganizationsService _organizationsService;
        private readonly IHasher _hasher;

        private readonly ILogger<CustomResourceOwnerPasswordValidator> _logger;


        public CustomResourceOwnerPasswordValidator(IRepository<User> userRepository,
            IOrganizationsService organizationsService,
            IHasher hasher,
            ILogger<CustomResourceOwnerPasswordValidator> logger)
        {
            _userRepository = userRepository;
            _organizationsService = organizationsService;
            _hasher = hasher;
            _logger = logger;
        }


        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                var user = await _userRepository.SingleOrDefaultAsync(u => u.UserName == context.UserName || u.Email == context.UserName);
                if (user == null)
                {
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "User does not exist");

                    return;
                }

                var passwordHash = _hasher.GetHash(context.Password);
                if (user.PasswordHash != passwordHash)
                {
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "Invalid password");

                    return;
                }

                if (!user.IsActive)
                {
                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidRequest, "User is not allowed to sign in");

                    return;
                }

                var organization = await _organizationsService.GetOrganizationAsync(user);
                var organizationId = organization?.Id.ToString() ?? string.Empty;

                context.Result = new GrantValidationResult(
                    subject: user.Id.ToString(),
                    authenticationMethod: "custom",
                    claims: user.GetUserClaims(organizationId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.ToString());

                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Invalid username/email or password");
            }
        }
    }
}

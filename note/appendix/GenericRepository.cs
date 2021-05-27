using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using MongoDB.Driver;

using TwilightSparkle.DataAccess.Interfaces;

namespace TwilightSparkle.DataAccess.MongoDb.Implementations
{
    public class GenericRepository<T> : IRepository<T> where T : class, new()
    {
        private readonly MongoContext _mongoContext;


        public GenericRepository(MongoContext mongoContext)
        {
            _mongoContext = mongoContext;
        }


        public void Create(T item)
        {
            _mongoContext.AddEntity(item);
        }

        public void Update(T item)
        {
            _mongoContext.UpdateEntity(item);
        }

        public void Delete(T item)
        {
            _mongoContext.DeleteEntity(item);
        }


        public async Task<IReadOnlyCollection<T>> AllAsync()
        {
            var collection = await GetQueryAsync();

            return await collection.ToListAsync();
        }

        public async Task<IReadOnlyCollection<T>> WhereAsync(Expression<Func<T, bool>> expression)
        {
            var collection = await GetQueryAsync(expression);

            return await collection.ToListAsync();
        }

        public async Task<T> SingleOrDefaultAsync(Expression<Func<T, bool>> expression)
        {
            var collection = await GetQueryAsync(expression);

            return await collection.SingleOrDefaultAsync();
        }

        public async Task<T> FirstOrDefaultAsync(Expression<Func<T, bool>> expression)
        {
            var collection = await GetQueryAsync(expression);

            return await collection.FirstOrDefaultAsync();
        }

        public IQueryable<T> All()
        {
            return GetQueryable();
        }

        public async Task<long> CountAsync(Expression<Func<T, bool>> expression = null)
        {
            var count = await GetQuery(expression).CountDocumentsAsync();

            return count;
        }

        public async Task<IReadOnlyCollection<T>> SkipTakeAsync(int startIndex, int size, Expression<Func<T, bool>> expression = null)
        {
            var collection = await GetQuery(expression).Skip(startIndex).Limit(size).ToListAsync();

            return collection;
        }


        protected Task<IAsyncCursor<T>> GetQueryAsync(Expression<Func<T, bool>> expression = null)
        {
            var filter = Builders<T>.Filter.Empty;

            return _mongoContext.DbSet<T>().FindAsync(expression ?? filter);
        }

        protected IQueryable<T> GetQueryable()
        {
            return _mongoContext.DbSet<T>().AsQueryable();
        }

        protected IFindFluent<T, T> GetQuery(Expression<Func<T, bool>> expression = null)
        {
            var filter = Builders<T>.Filter.Empty;

            return _mongoContext.DbSet<T>().Find(expression ?? filter);
        }
    }
}

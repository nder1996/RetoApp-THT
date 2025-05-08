using System;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.Common.Interfaces;

public interface ICacheService_1
{
    Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> factory, TimeSpan? expiration = null);
    Task RemoveAsync(string key);
}

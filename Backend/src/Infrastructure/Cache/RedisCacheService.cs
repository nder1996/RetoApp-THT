using System;
using System.Text.Json;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using StackExchange.Redis;

namespace CleanArchitecture.Infrastructure.Cache;

public class RedisCacheService : ICacheService
{
    private readonly IConnectionMultiplexer _redisConnection;
    private readonly IDatabase _cache;

    public RedisCacheService(IConnectionMultiplexer redisConnection)
    {
        _redisConnection = redisConnection;
        _cache = redisConnection.GetDatabase();
    }

    public async Task<T?> GetAsync<T>(string key)
    {
        var value = await _cache.StringGetAsync(key);
        if (value.IsNull)
        {
            return default;
        }

        return JsonSerializer.Deserialize<T>(value!);
    }

    public async Task SetAsync<T>(string key, T value, TimeSpan? expiration = null)
    {
        var serializedValue = JsonSerializer.Serialize(value);
        await _cache.StringSetAsync(key, serializedValue, expiration);
    }

    public async Task RemoveAsync(string key)
    {
        await _cache.KeyDeleteAsync(key);
    }

    public async Task<bool> ExistsAsync(string key)
    {
        return await _cache.KeyExistsAsync(key);
    }

    async Task<T> ICacheService.GetOrCreateAsync<T>(string key, Func<Task<T>> factory, TimeSpan? expiration)
    {
        // Verificar si la clave existe en la caché
        var value = await GetAsync<T>(key);

        // Si el valor existe, devolverlo
        if (value != null)
        {
            return value;
        }

        // Si no existe, ejecutar la función factory para obtener el valor
        var newValue = await factory();

        // Guardar el nuevo valor en la caché
        await SetAsync(key, newValue, expiration);

        // Devolver el nuevo valor
        return newValue;
    }
} 

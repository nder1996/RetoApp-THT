using System;
using System.Text.Json;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using StackExchange.Redis;

namespace CleanArchitecture.Infrastructure.Cache;

public class RedisCacheService : ICacheService_1
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

    public async Task<T> GetOrCreateAsync<T>(string key, Func<Task<T>> factory, TimeSpan? expiration = null)
    {
        // Verificar si la clave EXISTE en Redis
        bool keyExists = await ExistsAsync(key);

        if (keyExists)
        {
            // Si la clave existe, verificar si ha expirado
            var timeToLive = await _cache.KeyTimeToLiveAsync(key);
            if (timeToLive == null || timeToLive <= TimeSpan.Zero)
            {
                Console.WriteLine($"[RedisCacheService] La clave {key} ha expirado. Eliminándola del caché.");
                await RemoveAsync(key);
            }
            else
            {
                // Retornar el valor almacenado si no ha expirado
                var cachedValue = await GetAsync<T>(key);
                if (cachedValue is not null)
                {
                    Console.WriteLine($"[RedisCacheService] Datos obtenidos desde el caché para la clave: {key}");
                    return cachedValue;
                }
            }
        }

        // Si la clave NO existe o ha expirado, ejecutar la consulta a la base de datos
        Console.WriteLine($"[RedisCacheService] Datos no encontrados en caché. Consultando la base de datos para la clave: {key}");
        var newValue = await factory();

        // Guardar el nuevo valor en Redis con el tiempo de expiración
        await SetAsync(key, newValue, expiration ?? TimeSpan.FromMinutes(1));

        return newValue;
    }


}

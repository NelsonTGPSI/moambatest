const CACHE_NAME = 'moamba-cache-v1';

// Lista de recursos para guardar no cache
const urlsToCache = [
    '/',
    '/css/styles.css',
    '/css/menu.css',
    '/css/gallery.css',
    '/css/contact.css',
    '/js/main.js',
    '/js/gallery.js',
    // Imagens críticas
    '/assets/img/logo dourado.png',
    '/assets/img/espaco.jpg',
    // Fontes e ícones
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Quando o Service Worker é instalado
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Quando o navegador faz uma requisição
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Se encontrou no cache, retorna o cache
                if (response) {
                    return response;
                }
                
                // Se não encontrou, busca na rede
                return fetch(event.request)
                    .then(response => {
                        // Se não for uma resposta válida, retorna ela direto
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clona a resposta pois ela só pode ser usada uma vez
                        var responseToCache = response.clone();
                        
                        // Adiciona a nova resposta ao cache
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                            
                        return response;
                    });
            })
    );
});
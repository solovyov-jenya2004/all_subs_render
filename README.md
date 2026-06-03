# 🚀 all_subs — VPN-подписка для белых списков в РФ (через Render)

[![Stars](https://img.shields.io/github/stars/solovyov-jenya2004/all_subs_render?style=flat-square&color=0e75b6)](https://github.com/solovyov-jenya2004/all_subs_render/stargazers)
[![Issues](https://img.shields.io/github/issues/solovyov-jenya2004/all_subs_render?style=flat-square&color=0e75b6)](https://github.com/solovyov-jenya2004/all_subs_render/issues)
[![Last commit](https://custom-icon-badges.demolab.com/github/last-commit/solovyov-jenya2004/all_subs_render?logo=history&logoColor=white&color=0e75b6&style=flat-square)](https://github.com/solovyov-jenya2004/all_subs_render/commits/main)
![Visitors](https://komarev.com/ghpvc/?username=solovyov-jenya2004&repo=all_subs_render&label=visitors&color=0e75b6&style=flat-square)

> ⚡ Серверная функция Render для доступа к подпискам [🚀 all_subs](https://github.com/solovyov-jenya2004/all_subs).  
> Все эндпоинты загружают данные напрямую с GitHub при каждом запросе.

---

## 📦 Что здесь лежит

В отличие от статических файлов, здесь каждый эндпоинт динамически отдаёт самую свежую версию подписки прямо с GitHub.  
Вам доступны три ссылки:

### 1. Полный список (обычный текст)

```
https://all-subs.onrender.com/final_sorted
```

### 2. Полный список в Base64

```
https://all-subs.onrender.com/final_sorted_base64
```

### 3. Мобильная подписка

Этот эндпоинт каждый раз отдаёт **новый случайный набор** конфигов из общей базы.  
По умолчанию — **100** конфигов.

```
https://all-subs.onrender.com/random
```

Хотите другое количество?  
Напишите `?n=`, а затем число — и вы получите ровно столько конфигов, сколько нужно.  
Например:  
> `https://all-subs.onrender.com/random?n=50` → 50 конфигов

> `https://all-subs.onrender.com/random?n=200` → 200 конфигов  

---

## 🧠 Как это устроено

Зеркало работает на Render. Вся логика собрана в одном файле `server.js` — он принимает HTTP-запросы, забирает свежие данные с GitHub и сразу отдаёт ответ.

- **`/final_sorted`** – полный список конфигов в виде обычного текста.
- **`/final_sorted_base64`** – тот же список, но закодированный в Base64.
- **`/random`** – каждый раз возвращает новую случайную выборку. По умолчанию — 100 конфигов, а параметр `?n=` позволяет указать своё число.

Все данные напрямую проксируются с GitHub, поэтому обновления появляются мгновенно.

Основной генератор подписок работает в [all_subs](https://github.com/solovyov-jenya2004/all_subs) и запускается каждую минуту.  
Там же вы можете найти полный список источников, FAQ и документацию.

---
## 🌱 В планах

- [x] Зеркало полного списка (обычный текст)
- [x] Зеркало в Base64
- [x] Случайная подписка с настраиваемым количеством
- [x] Кэширование с регулируемым интервалом (сейчас 1 минута)
- [ ] Выбор протоколов (например, только VLESS или только Shadowsocks)

---

## 📜 Лицензия

[![CC0](https://licensebuttons.net/p/zero/1.0/88x31.png)](https://raw.githubusercontent.com/solovyov-jenya2004/all_subs_render/refs/heads/main/LICENSE)

Этот проект распространяется под лицензией **Creative Commons Zero v1.0 Universal (CC0)**.

Вы можете свободно копировать, изменять, распространять и использовать конфиги в любых целях, включая коммерческие, без получения разрешения автора и без указания авторства.

Подробнее: [LICENSE](https://raw.githubusercontent.com/solovyov-jenya2004/all_subs_render/refs/heads/main/LICENSE)


## 💬 Контакты

Есть вопрос, идея или нашли ошибку?  
Создайте [Issue](https://github.com/solovyov-jenya2004/all_subs_render/issues).

---

## ДИСКЛЕЙМЕР

> *Данный репозиторий является независимым зеркалом. Я не являюсь создателем или владельцем публикуемых VPN‑конфигураций. Материал носит ознакомительный характер.*  
> *Вся ответственность за использование конфигураций лежит на конечном пользователе.*  
> *Проект некоммерческий и не рекламирует какие‑либо VPN‑сервисы.*  
> *Используйте информацию и файлы исключительно в законных целях.*  
> *Подробнее об основном проекте: [🚀 all_subs](https://github.com/solovyov-jenya2004/all_subs)*

---

## 🔍 Ключевые слова для поиска

vpn, white list, white lists, wl, бл, белый список, белые списки, подписка, sub, subscription, ru, whitelist, whitelists, впн, ру, россия, рф, российская федерация, russia, russian federation, rf, render

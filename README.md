<div align="center">
<h1>Докеризация и деплой сервиса 'КупиПодариДай' на сервер</h1>
<a href="https://github.com/VladislavSerKir/web-plus-docker-and-compose">
</a>
</div>

Развертывание сервиса 'КупиПодариДай' на облачном сервере с помощью docker контейнеров

## Описание

* В качестве основной ОС для развертывания выбрана Linux ubuntu 20.04
* Для скачивания **npm пакетов** и работы **backend части** сервиса установлен пакет **node**
* Установлена БД **Postgres** для работы сервиса с базой данных, а так же **Git** для скачивания кода непосредственно с репозитория сразу на сервер
* Прописаны файлы окружения **.env** в зависимости от среды развертывания
* Для **маппинга** портов frontend и backend частей приложения, установлен и настроен **HTTP сервер nginx**. Для корректного отображения статики фронтенда прописаны правила обработки файлов и роутов:
![2023-07-20_21-12-41](https://github.com/VladislavSerKir/web-plus-docker-and-compose/assets/83783362/033c078c-2d77-4bef-a3b9-4928e80e2598)
* Настроен backend на поддомене /api
* Выпущен сертификат **SSL** и настроено шифрование с помощью протокола **HTTPS**
  
<h3>Созданы файлы для быстрого развертывания `docker-compose.yml` - для разработки и `docker-compose.pub.yml` - для production.</h4>
Конфигурация:

* Сервисы разделены на:
  - **backend**
  - **frontend**
  - **postgres**
  - **adminer**
* Переадресация **backend** части приложения осуществляется с 3000 порта на 4000, **frontend** с 3000 на 3001
* Настроена сеть внутри контейнера для связи **backend** - *backend_network*, соединяет:
  - **backend**
  - **postgres**
  - **adminer**
* Настроена сеть внутри контейнера для связи **frontend** - *frontend_network*, соединяет:
  - **frontend**
* Установлено хранилище **volume**, в качестве пути хранения используется: `pg_data:/data/postgres`
* Настроен перезапуск приложения если не выполнена остановка вручную

## Развертывание
IP address `8130.193.37.247`

**Frontend** [https://vladislav.nomoredomains.work/](https://vladislav.nomoredomains.work/)

**Backend** [https://api.vladislav.nomoredomains.work/](https://api.vladislav.nomoredomains.work/)
## Написать мне
[![github](https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github)](https://github.com/VladislavSerKir)
[![telegram](https://img.shields.io/badge/Telegram-68c4f0?style=for-the-badge&logo=telegram)](https://t.me/vl_kireev)

### Legend

Фрилансер Margaret Brick работает в своей небольшой веб-студии Brick and Willow Design, и оказывает разного рода услуги
своим клиентам, начиная от разработки логотипов, и заканчивая версткой сайтов-визиток. Словом, все что попросят. Клиенты
Маргарет любят, и постоянно к ней обращаются. Маргарет работает в одиночку, иногда с рутинными делами ей помогает ее
друг Carlo. Маргарет старается автоматизировать часто повторяющиеся дела, и просит помощи своего друга-программиста. Вот
и сейчас Маргарет попросила Карло помочь с автоматизацией отправки клиентам счетов для оплаты ее услуг.

### Task description

Необходимо спроектировать и разработать небольшой сервис для генерации счетов на оплату
(инвойсов), и отправку счетов на электронную почту клиентам.

### Workflow

1. Клиент отправляет HTTP-запрос на сервис, передавая на API:
    - email-адрес, на который требуется выслать счет на оплату,
    - содержание выполненных работ, в виде списка работ и стоимости по каждому пункту.
2. Сервис логгирует входящий запрос путем создания записи в базе данных.
3. Сервис получает дополнительную информацию для генерации инвойса из базы данных, используя email как ключ для поиска:
    - информацию о клиенте (first name, last name),
    - информацию о компании, в которой работает получатель счета.
4. Сервис генерирует PDF-документ на основе шаблона. PDF включает:
    - информацию о клиенте,
    - информацию о компании клиента,
    - общую сумму для оплаты,
    - список выполненных работ и их стоимость,
    - номер инвойса,
    - дату выставления инвойса,
    - информацию об отправителе (имя, адрес, и тд).
5. Сервис отправляет PDF-документ на электронную почту, как прикрепленный файл.
    - информацию о клиенте (first name, last name),
    - информацию о компании, в которой работает получатель счета.

### Требования к реализации (рекомендательного характера)

1. Платформа для создания сервиса — Node.js.
2. PostgreSQL в качестве сервера баз данных.
3. Отправку почты через сервис Mailgun.
4. Использовать архитектуру основанную на очередях для выполнения асинхронных задач:
    - генерация PDF-документа,
    - отправку электронного сообщения. Для этого можно использовать систему BullMQ, ​ https://docs.bullmq.io​ .
5. Для генерации PDF использовать библиотеку html-pdf-node​ (https://www.npmjs.com/package/html-pdf-node), html-pdf или
   любую другую.
6. Для документирования использовать сервис — Swagger (Open API).

Можно использовать любые общедоступные библиотеки, которые сочтёте нужным.
Если есть энтузиазм, желание, и время — автоматические тесты будут только плюсом.

### Примечания

1. Плюсом будет использование ​ docker-compose​ для организации работы с
   инфраструктурами вещами (Postgres, Redis, etc).
1. Пример шаблона для инвойса (“красота верстки” не обязательна):
    - https://jumbotron-production-f.squarecdn.com/assets/72450bb7af7a27ac77a3.jpg
    - пример взят отсюда: ​ https://squareup.com/us/en/townsquare/invoice-examples​ , see “Example invoice for
      freelancers”
1. Плюсом будет использование TypeScript
1. Тестирование работоспособности сервиса будет выполняться с помощью любого HTTP-клиента, например ​ curl​ или Postman
   API Client.
1. Во время написания сервиса не стоит изобретать велосипеды, лучше взять что-то
   существующие.

### Результат работы

1. Мы хотели бы видеть результат выполнения в репозитории на GitHub. По ходу
   выполнения задания, делайте логически обоснованные атомарные коммиты.
2. В репозитории может быть готовая или промежуточная реализация тестового задания.
3. Приложите пожалуйста инструкцию для запуска и тестирования сервиса.
4. В репозитории также должен быть SQL-скрипт создания таблиц в базе данных.

### Наводящие вопросы

1. Вопросы масштабирования
2. SOLID
3. https://12factor.net/ru/

&copy; Twelvedevs
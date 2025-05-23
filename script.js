document.addEventListener('DOMContentLoaded', function() {
    // Получаем ссылки на элементы DOM
    const generateBtn = document.getElementById('generate-btn');
    const qrcodeDiv = document.getElementById('qrcode');
    const previewContainer = document.getElementById('preview-container');
    const downloadLink = document.getElementById('download-link');
    
    // Обработчик клика по кнопке генерации
    generateBtn.addEventListener('click', function() {
        // Получаем значения из полей ввода
        const website = document.getElementById('website').value.trim();
        const vk = document.getElementById('vk').value.trim();
        const telegram = document.getElementById('telegram').value.trim();
        const instagram = document.getElementById('instagram').value.trim();
        const facebook = document.getElementById('facebook').value.trim();
        const twitter = document.getElementById('twitter').value.trim();
        
        // Проверяем, заполнен ли хотя бы один из социальных профилей
        if (!website && !vk && !telegram && !instagram && !facebook && !twitter) {
            alert('Пожалуйста, заполните хотя бы одну ссылку');
            return;
        }
        
        // Создаем HTML-контент целевой страницы для предпросмотра
        const landingPageHtml = generateLandingPage(website, vk, telegram, instagram, facebook, twitter);
        
        // Если заполнена только одна ссылка, используем её напрямую для QR-кода
        let qrContent = "";
        let linkCount = 0;
        
        if (website) { qrContent = website; linkCount++; }
        if (vk && linkCount === 0) { qrContent = vk; linkCount++; }
        else if (vk) linkCount++;
        if (telegram && linkCount === 0) { qrContent = telegram; linkCount++; }
        else if (telegram) linkCount++;
        if (instagram && linkCount === 0) { qrContent = instagram; linkCount++; }
        else if (instagram) linkCount++;
        if (facebook && linkCount === 0) { qrContent = facebook; linkCount++; }
        else if (facebook) linkCount++;
        if (twitter && linkCount === 0) { qrContent = twitter; linkCount++; }
        else if (twitter) linkCount++;
        
        // Если у нас несколько ссылок, предложим создать страницу на Github Pages
        if (linkCount > 1) {
            showGithubPagesHelp(landingPageHtml);
            // Генерируем QR-код только для первой ссылки в качестве временного решения
            if (website) qrContent = website;
            else if (vk) qrContent = vk;
            else if (telegram) qrContent = telegram;
            else if (instagram) qrContent = instagram;
            else if (facebook) qrContent = facebook;
            else if (twitter) qrContent = twitter;
        }
        
        // Создаем QR-код
        generateQRCode(qrContent);
        
        // Показываем предпросмотр целевой страницы
        showLandingPagePreview(landingPageHtml);
        
        // Настраиваем ссылку для скачивания QR-кода
        setupDownloadLink();
        
        // Сохраняем HTML-файл для локального использования
        saveHtmlFile(landingPageHtml);
    });
    
    // Функция для показа инструкций по созданию страницы на Github Pages
    function showGithubPagesHelp(html) {
        const helpBox = document.createElement('div');
        helpBox.className = 'github-help';
        helpBox.innerHTML = `
            <h3>Обнаружено несколько ссылок</h3>
            <p>QR-коды с несколькими ссылками могут не распознаваться некоторыми сканерами. Рекомендуем создать бесплатную веб-страницу со всеми вашими ссылками:</p>
            <ol>
                <li>Зарегистрируйтесь на <a href="https://github.com" target="_blank">GitHub</a> (если у вас еще нет аккаунта)</li>
                <li>Создайте новый репозиторий с именем <strong>username.github.io</strong> (где username - ваше имя пользователя)</li>
                <li>Загрузите файл index.html с содержимым ниже</li>
                <li>Дождитесь публикации сайта (обычно занимает несколько минут)</li>
                <li>Используйте ссылку https://username.github.io для создания QR-кода</li>
            </ol>
            <textarea class="html-content" readonly>${html}</textarea>
            <button id="copy-html">Скопировать HTML</button>
            <p>Также вы можете использовать другие бесплатные сервисы: <a href="https://neocities.org" target="_blank">Neocities</a>, <a href="https://pages.cloudflare.com" target="_blank">Cloudflare Pages</a>, <a href="https://firebase.google.com/docs/hosting" target="_blank">Firebase Hosting</a></p>
        `;
        
        // Добавляем блок после секции QR-кода
        const qrContainer = document.querySelector('.qr-container');
        qrContainer.parentNode.insertBefore(helpBox, qrContainer.nextSibling);
        
        // Добавляем обработчик для копирования HTML
        document.getElementById('copy-html').addEventListener('click', function() {
            const textarea = document.querySelector('.html-content');
            textarea.select();
            document.execCommand('copy');
            this.textContent = 'Скопировано!';
            setTimeout(() => {
                this.textContent = 'Скопировать HTML';
            }, 2000);
        });
    }
    
    // Функция для генерации HTML-кода целевой страницы
    function generateLandingPage(website, vk, telegram, instagram, facebook, twitter) {
        let html = `
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Мои социальные сети</title>
            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    background-color: #f5f5f5;
                    padding: 20px;
                }
                .landing-page {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                }
                h1 {
                    text-align: center;
                    margin-bottom: 30px;
                    color: #2c3e50;
                }
                .social-links {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                    margin-top: 30px;
                }
                .social-button {
                    display: block;
                    padding: 15px 20px;
                    background-color: #3498db;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    text-align: center;
                    font-weight: bold;
                    transition: background-color 0.3s, transform 0.2s;
                }
                .social-button:hover {
                    background-color: #2980b9;
                    transform: translateY(-2px);
                }
                .vk { background-color: #45668e; }
                .vk:hover { background-color: #3a5a7d; }
                .telegram { background-color: #0088cc; }
                .telegram:hover { background-color: #007ab8; }
                .instagram { background-color: #e1306c; }
                .instagram:hover { background-color: #c13584; }
                .facebook { background-color: #3b5998; }
                .facebook:hover { background-color: #2d4373; }
                .twitter { background-color: #1da1f2; }
                .twitter:hover { background-color: #0c85d0; }
                .website { background-color: #27ae60; }
                .website:hover { background-color: #219d55; }
            </style>
        </head>
        <body>
            <div class="landing-page">
                <h1>Мои социальные сети</h1>
                <div class="social-links">
        `;
        
        if (website) {
            html += `<a href="${website}" class="social-button website" target="_blank">Мой веб-сайт</a>`;
        }
        if (vk) {
            html += `<a href="${vk}" class="social-button vk" target="_blank">ВКонтакте</a>`;
        }
        if (telegram) {
            html += `<a href="${telegram}" class="social-button telegram" target="_blank">Telegram</a>`;
        }
        if (instagram) {
            html += `<a href="${instagram}" class="social-button instagram" target="_blank">Instagram</a>`;
        }
        if (facebook) {
            html += `<a href="${facebook}" class="social-button facebook" target="_blank">Facebook</a>`;
        }
        if (twitter) {
            html += `<a href="${twitter}" class="social-button twitter" target="_blank">Twitter</a>`;
        }
        
        html += `
                </div>
            </div>
        </body>
        </html>
        `;
        
        return html;
    }
    
    // Функция для генерации QR-кода
    function generateQRCode(text) {
        // Очищаем предыдущий QR-код
        qrcodeDiv.innerHTML = '';
        
        try {
            // Создаем новый QR-код с фиксированным типом 4 и уровнем коррекции L для малого количества данных
            const qr = qrcode(4, 'L');
            qr.addData(text);
            qr.make();
            
            // Получаем изображение QR-кода и добавляем в DOM
            const qrImage = qr.createImgTag(5);
            qrcodeDiv.innerHTML = qrImage;
            
            // Показываем ссылку для скачивания
            downloadLink.classList.remove('hidden');
        } catch (e) {
            // Пробуем создать с более высоким типом, если первая попытка не удалась
            try {
                const qr = qrcode(8, 'L');
                qr.addData(text);
                qr.make();
                
                const qrImage = qr.createImgTag(5);
                qrcodeDiv.innerHTML = qrImage;
                
                downloadLink.classList.remove('hidden');
            } catch (e2) {
                qrcodeDiv.innerHTML = '<p style="color: red;">Ошибка: Слишком много данных для QR-кода. Пожалуйста, сократите ссылки.</p>';
                console.error(e2);
            }
        }
    }
    
    // Функция для предпросмотра целевой страницы
    function showLandingPagePreview(html) {
        // Создаем iframe для предпросмотра
        previewContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        iframe.style.border = 'none';
        
        previewContainer.appendChild(iframe);
        
        // Записываем HTML в iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(html);
        iframeDoc.close();
    }
    
    // Функция для настройки ссылки скачивания QR-кода
    function setupDownloadLink() {
        // Получаем изображение QR-кода
        const qrImg = qrcodeDiv.querySelector('img');
        
        if (!qrImg) return;
        
        // Создаем canvas для конвертации изображения в dataURL
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Дожидаемся загрузки изображения
        qrImg.onload = function() {
            canvas.width = qrImg.width;
            canvas.height = qrImg.height;
            ctx.drawImage(qrImg, 0, 0);
            
            // Устанавливаем dataURL в качестве источника для ссылки скачивания
            const dataURL = canvas.toDataURL('image/png');
            downloadLink.href = dataURL;
        };
        
        // Если изображение уже загружено
        if (qrImg.complete) {
            qrImg.onload();
        }
    }
    
    // Функция для сохранения HTML-файла
    function saveHtmlFile(html) {
        // Создаем Blob с HTML
        const blob = new Blob([html], {type: 'text/html'});
        
        // Создаем ссылку для скачивания
        const htmlLink = document.createElement('a');
        htmlLink.href = URL.createObjectURL(blob);
        htmlLink.download = 'social-links.html';
        
        // Добавляем ссылку в DOM и автоматически кликаем по ней
        document.body.appendChild(htmlLink);
        htmlLink.click();
        
        // Удаляем ссылку из DOM
        document.body.removeChild(htmlLink);
    }
}); 
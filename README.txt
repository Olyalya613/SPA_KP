Patch: URL images + Cancel->Home
--------------------------------
Файли, які треба замінити/додати у вашому проєкті:
- src/app/models/phone.ts
- src/app/phones-list/phones-list.component.html
- src/app/phones-list/phones-list.component.ts
- src/app/phone-details/phone-details.component.html
- src/app/phone-details/phone-details.component.ts
- src/app/phone-form/phone-form.component.html
- src/app/phone-form/phone-form.component.ts
- src/app/services/in-memory-data.service.ts  (демо-дані; можна не чіпати, якщо у вас свій бекенд)
- styles-append.css  (вставте в КІНЕЦЬ вашого src/styles.css)

Як користуватись полем "URL зображення":
- можна вставляти http/https посилання або data:image/...;base64,...
- у формі є live-превʼю; якщо картинка не завантажується, спрацює fallback-плейсхолдер.

Кнопка "Скасувати" на формі веде на '/' (головна).

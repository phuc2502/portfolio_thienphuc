# 🔧 Hướng dẫn Sửa Lỗi EmailJS: Người điền form nhận email sai, Owner không nhận được email

## 🔍 Phân tích vấn đề

**Vấn đề bạn đang gặp:**
1. ❌ Người điền form nhận được email nhưng **form email bị sai** (có thể nội dung/format không đúng)
2. ❌ **Owner không nhận được email** thông báo khi có người submit form

**Nguyên nhân có thể:**
- Template Auto-Reply (`template_17nvhcr`) đang dùng **sai biến** hoặc format không đúng
- Template Owner Notification (`template_7lzk2dd`) **chưa được tạo** hoặc **chưa cấu hình đúng** "To Email"

---

## ✅ Giải pháp từng bước

### Bước 1: Kiểm tra Template Auto-Reply (template_17nvhcr)

#### 1.1. Truy cập EmailJS Dashboard
1. Vào https://dashboard.emailjs.com/admin
2. Click **Email Templates** ở menu bên trái
3. Tìm và click vào template `template_17nvhcr` (hoặc template có tên "Auto-Reply")

#### 1.2. Kiểm tra phần "To Email"
**PHẢI có một trong các giá trị sau:**
- ✅ `{{email}}` (khuyến nghị - code đã gửi `email: formData.email`)
- ✅ `{{to_email}}` (dự phòng - code đã gửi `to_email: formData.email`)
- ❌ **KHÔNG để trống**
- ❌ **KHÔNG dùng email cố định** (vì template này gửi cho người điền form, mỗi người có email khác nhau)

#### 1.3. Kiểm tra phần "Subject"
Ví dụ đúng:
```
Thank you for contacting me, {{name}}!
```
hoặc
```
Auto-Reply: Your message has been received
```

**Lưu ý:** Nếu bạn dùng `{{name}}` trong subject, code đã gửi biến `name: formData.name`.

#### 1.4. Kiểm tra phần "Content" (Email Body)
**Template phải sử dụng đúng các biến mà code gửi:**

Code đang gửi các biến sau:
```javascript
{
  email: formData.email,        // {{email}} - To Email
  to_email: formData.email,     // {{to_email}} - To Email (dự phòng)
  name: formData.name,          // {{name}} - Tên người điền form
  from_name: formData.name,     // {{from_name}} - Tên người điền form
  message: formData.message,    // {{message}} - Nội dung tin nhắn
  title: formData.message,      // {{title}} - Dự phòng
  from_email: formData.email,   // {{from_email}} - Email người điền form
  reply_to: targetEmail,        // {{reply_to}} - Email để reply (email của owner)
  owner_email: targetEmail,     // {{owner_email}} - Email của owner
}
```

**Ví dụ Template Content đúng:**
```
Hi {{name}},

Thank you for contacting me! I have received your message and will get back to you as soon as possible.

Your message:
{{message}}

---
Best regards,
[Your Name]

P.S. If you need immediate assistance, please reply to this email or contact me directly at {{reply_to}}.
```

**❌ Các lỗi thường gặp:**
- Dùng `{{title}}` thay vì `{{message}}` để hiển thị nội dung → Sửa thành `{{message}}`
- Dùng `{{user_name}}` thay vì `{{name}}` hoặc `{{from_name}}` → Sửa thành `{{name}}` hoặc `{{from_name}}`
- "To Email" để trống hoặc dùng email cố định → Sửa thành `{{email}}`

#### 1.5. Lưu Template
Sau khi sửa xong, click **Save** để lưu template.

---

### Bước 2: Kiểm tra và Tạo Template Owner Notification

#### 2.1. Kiểm tra xem template `template_7lzk2dd` có tồn tại không

1. Vào https://dashboard.emailjs.com/admin
2. Click **Email Templates**
3. Tìm template có ID `template_7lzk2dd`

**Nếu KHÔNG tìm thấy:**
- Template này chưa được tạo → Cần tạo mới (xem Bước 2.2)

**Nếu tìm thấy:**
- Kiểm tra cấu hình (xem Bước 2.3)

#### 2.2. Tạo Template Owner Notification mới (nếu chưa có)

1. Vào **Email Templates** → **Create New Template**
2. Đặt tên: `Owner Notification` hoặc `Form Submission Alert`
3. **Cấu hình như sau:**

**To Email:**
```
{{email}}
```
HOẶC
```
thiephuc.ba@gmail.com
```
⚠️ **QUAN TRỌNG:** KHÔNG để trống!

**Subject:**
```
[PORTFOLIO] New Contact Form Message from {{from_name}}
```
hoặc
```
New message from {{from_name}} ({{from_email}})
```

**Content:**
```
Bạn có một tin nhắn mới từ contact form trên portfolio!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Tên: {{from_name}}
📧 Email: {{from_email}}

💬 Nội dung tin nhắn:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Để trả lời, hãy reply email này hoặc gửi email đến: {{from_email}}

---
Email được gửi tự động từ contact form.
Thời gian: {{#timestamp}}
```

4. Click **Save**
5. **Copy Template ID** (ví dụ: `template_xxxxx`)
6. **Cập nhật trong code hoặc file .env:**
   - Tạo file `.env` trong thư mục gốc (nếu chưa có)
   - Thêm dòng:
     ```
     VITE_EMAILJS_OWNER_TEMPLATE_ID=template_xxxxx
     ```
   - Restart server (nếu đang chạy)

#### 2.3. Kiểm tra Template Owner Notification hiện có

Nếu template `template_7lzk2dd` đã tồn tại, kiểm tra:

**To Email:**
- ✅ Phải có: `{{email}}`, `{{to_email}}`, hoặc `{{owner_email}}`
- ✅ Hoặc email cố định: `thiephuc.ba@gmail.com`
- ❌ KHÔNG để trống!

**Subject và Content:**
- Đảm bảo dùng đúng các biến mà code gửi:
  - `{{from_name}}` - Tên người điền form
  - `{{from_email}}` - Email người điền form
  - `{{message}}` - Nội dung tin nhắn
  - `{{reply_to}}` - Email để reply (email của người điền form)

---

### Bước 3: Kiểm tra Service Connection

1. Vào https://dashboard.emailjs.com/admin/integration
2. Kiểm tra Service `service_a7ixd56` đã được kết nối với email provider chưa (Gmail/Outlook/etc.)
3. Nếu chưa, click **Add New Service** và kết nối với email của bạn

---

### Bước 4: Test và Debug

#### 4.1. Mở Console trong Browser
1. Mở website portfolio của bạn
2. Nhấn **F12** để mở Developer Tools
3. Chọn tab **Console**

#### 4.2. Submit Form và xem logs

**Khi submit form, bạn sẽ thấy các logs sau:**

✅ **Logs thành công cho Auto-Reply:**
```
=== EmailJS Configuration Debug ===
Service ID: service_a7ixd56
Template ID: template_17nvhcr
Sending auto-reply with params: {email: "user@example.com", name: "...", ...}
✅ EmailJS auto-reply success: {status: 200, text: "OK"}
```

✅ **Logs thành công cho Owner Notification:**
```
📧 Sending owner notification with params: {email: "thiephuc.ba@gmail.com", ...}
📧 Owner Template ID: template_xxxxx
✅ EmailJS owner notification success: {status: 200, text: "OK"}
✅ Owner email sent to: thiephuc.ba@gmail.com
```

❌ **Logs lỗi thường gặp:**

**Lỗi "recipients address is empty":**
```
❌ Owner notification email failed: {status: 400, text: "recipients address is empty"}
```
→ **Giải pháp:** Kiểm tra template Owner Notification, phần "To Email" phải có giá trị ({{email}} hoặc email cố định)

**Lỗi "Template not found":**
```
❌ Owner notification email failed: {status: 404, text: "Template not found"}
```
→ **Giải pháp:** Kiểm tra Template ID trong file .env có đúng không, hoặc template đã bị xóa

**Lỗi khác:**
- Xem chi tiết error trong console để biết nguyên nhân cụ thể

#### 4.3. Kiểm tra EmailJS Dashboard → Email History

1. Vào https://dashboard.emailjs.com/admin/history
2. Xem danh sách email đã gửi
3. Kiểm tra:
   - ✅ Email có được gửi không?
   - ✅ Status là "Success" hay "Failed"?
   - ✅ Nếu Failed, xem error message

---

## 📋 Checklist sửa lỗi

- [ ] **Template Auto-Reply (`template_17nvhcr`):**
  - [ ] "To Email" có giá trị `{{email}}` hoặc `{{to_email}}`
  - [ ] "Subject" sử dụng đúng biến (`{{name}}` hoặc `{{from_name}}`)
  - [ ] "Content" sử dụng đúng biến (`{{message}}` cho nội dung, `{{name}}` hoặc `{{from_name}}` cho tên)
  - [ ] Đã click **Save**

- [ ] **Template Owner Notification:**
  - [ ] Template đã được tạo (hoặc đã tồn tại)
  - [ ] "To Email" có giá trị `{{email}}`, `{{to_email}}`, `{{owner_email}}`, hoặc `thiephuc.ba@gmail.com`
  - [ ] "Subject" và "Content" sử dụng đúng biến (`{{from_name}}`, `{{from_email}}`, `{{message}}`)
  - [ ] Đã click **Save**
  - [ ] Template ID đã được thêm vào file `.env` hoặc code

- [ ] **Service Connection:**
  - [ ] Service `service_a7ixd56` đã được kết nối với email provider

- [ ] **Test:**
  - [ ] Đã submit form và kiểm tra console logs
  - [ ] Đã kiểm tra EmailJS Dashboard → Email History
  - [ ] Người điền form nhận được email với nội dung đúng
  - [ ] Owner nhận được email thông báo

---

## 🔄 Sau khi sửa

1. **Không cần restart server** - Template trong EmailJS được cập nhật ngay lập tức
2. **Nếu đã thêm/sửa Template ID trong .env:**
   - Restart server: `npm run dev` (hoặc `npm start`)
3. **Test lại form:**
   - Submit form mới
   - Kiểm tra console logs
   - Kiểm tra email inbox (cả người điền form và owner)

---

## 📞 Nếu vẫn còn lỗi

1. **Kiểm tra lại Console logs** - Xem error message cụ thể
2. **Kiểm tra EmailJS Dashboard:**
   - Email History → Xem email có được gửi không, status là gì
   - Email Templates → Xem template có được lưu đúng không
   - Integration → Xem service có hoạt động không
3. **Kiểm tra spam folder** - Email có thể bị vào spam
4. **Kiểm tra file .env:**
   - Các biến đã được set đúng chưa
   - Server đã được restart sau khi thay đổi .env chưa

---

## 📝 Ghi chú

- Code đã được cập nhật để gửi đầy đủ các biến cần thiết cho cả 2 template
- Code có logging chi tiết để dễ debug
- Nếu có lỗi, sẽ không phá vỡ trải nghiệm người dùng (auto-reply vẫn được gửi ngay cả khi owner notification fail)




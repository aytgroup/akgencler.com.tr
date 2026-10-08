import os

path = r'c:\Users\agity\Desktop\akgencler.com.tr\src\app\icon.tsx'

# Dosyayi oku ve entity'leri gercek karakterlere donustur
with open(path, 'rb') as f:
    data = f.read()

# HTML entity'leri temizle
data = data.replace(b'&lt;', b'<')
data = data.replace(b'&gt;', b'>')
data = data.replace(b'&amp;', b'&')
data = data.replace(b'&quot;', b'"')
data = data.replace(b'&#39;', b"'")

with open(path, 'wb') as f:
    f.write(data)

print('Temizlendi:', os.path.getsize(path), 'bytes')

# Kontrol
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

print('Ilk 300 karakter:')
print(content[:300])
print()
print('JSX tag var mi:', '<div' in content)

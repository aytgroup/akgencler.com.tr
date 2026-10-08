import os

files = [
    r'c:\Users\agity\Desktop\akgencler.com.tr\src\app\profil\[id]\page.tsx',
    r'c:\Users\agity\Desktop\akgencler.com.tr\src\app\giris\page.tsx',
    r'c:\Users\agity\Desktop\akgencler.com.tr\src\app\layout.tsx',
]

for path in files:
    if not os.path.exists(path):
        print(f'SKIP (not found): {path}')
        continue
    with open(path, 'rb') as f:
        data = f.read()
    original = data
    data = data.replace(b'&lt;', b'<')
    data = data.replace(b'&gt;', b'>')
    data = data.replace(b'&amp;', b'&')
    data = data.replace(b'&quot;', b'"')
    data = data.replace(b'&#39;', b"'")
    data = data.replace(b'&apos;', b"'")
    if data != original:
        with open(path, 'wb') as f:
            f.write(data)
        print(f'FIXED: {os.path.basename(path)} ({len(original)} -> {len(data)} bytes)')
    else:
        print(f'OK (no entities): {os.path.basename(path)}')

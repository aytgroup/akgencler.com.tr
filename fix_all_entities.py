import os

src_dir = r'c:\Users\agity\Desktop\akgencler.com.tr\src'

fixed = []
ok = []

for root, dirs, files in os.walk(src_dir):
    for fname in files:
        if fname.endswith('.tsx') or fname.endswith('.ts'):
            path = os.path.join(root, fname)
            with open(path, 'rb') as f:
                data = f.read()
            original = data
            data = data.replace(b'&lt;', b'<')
            data = data.replace(b'&gt;', b'>')
            data = data.replace(b'&amp;amp;', b'&')
            data = data.replace(b'&amp;', b'&')
            data = data.replace(b'&quot;', b'"')
            data = data.replace(b'&#39;', b"'")
            data = data.replace(b'&apos;', b"'")
            if data != original:
                with open(path, 'wb') as f:
                    f.write(data)
                fixed.append(path.replace(src_dir, ''))
            else:
                ok.append(fname)

print(f'\nFixed {len(fixed)} files:')
for f in fixed:
    print(' -', f)
print(f'\nOK: {len(ok)} files unchanged')

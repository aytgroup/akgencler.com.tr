import struct, os, zlib

def make_ico():
    # 32x32 PNG olustur - kirmizi zemin uzerinde beyaz AK
    # Oncelikle basit bir 32x32 kirmizi/beyaz bitmap ICO yapalim
    
    # ICO header
    # Her pixel BGRA (4 byte)
    W, H = 32, 32
    
    RED  = (0x2E, 0x10, 0xC8, 0xFF)  # #C8102E BGRA
    WHITE = (0xFF, 0xFF, 0xFF, 0xFF)
    
    pixels = []
    for y in range(H):
        row = []
        for x in range(W):
            row.append(RED)
        pixels.append(row)
    
    # "AK" harflerini piksel art olarak ciz (16x9 alan, ortali)
    # A harfi (sol)
    A = [
        "  XXX  ",
        " X   X ",
        "X     X",
        "XXXXXXX",
        "X     X",
        "X     X",
        "X     X",
    ]
    # K harfi (sag)
    K = [
        "X   X  ",
        "X  X   ",
        "X X    ",
        "XX     ",
        "X X    ",
        "X  X   ",
        "X   X  ",
    ]
    
    start_y = 12
    start_x_a = 4
    start_x_k = 18
    
    for i, row_str in enumerate(A):
        for j, ch in enumerate(row_str):
            if ch == 'X':
                pixels[start_y + i][start_x_a + j] = WHITE
    
    for i, row_str in enumerate(K):
        for j, ch in enumerate(row_str):
            if ch == 'X':
                pixels[start_y + i][start_x_k + j] = WHITE
    
    # PNG olustur
    def png_chunk(chunk_type, data):
        c = chunk_type + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xFFFFFFFF)
    
    # PNG signature
    sig = b'\x89PNG\r\n\x1a\n'
    
    # IHDR
    ihdr_data = struct.pack('>IIBBBBB', W, H, 8, 2, 0, 0, 0)  # 8bit RGB
    # Actually use RGBA (colortype=6)
    ihdr_data = struct.pack('>IIBBBBB', W, H, 8, 6, 0, 0, 0)
    ihdr = png_chunk(b'IHDR', ihdr_data)
    
    # IDAT - raw scanlines
    raw = b''
    for row in pixels:
        raw += b'\x00'  # filter type None
        for (b, g, r, a) in row:
            raw += bytes([r, g, b, a])
    
    compressed = zlib.compress(raw)
    idat = png_chunk(b'IDAT', compressed)
    
    # IEND
    iend = png_chunk(b'IEND', b'')
    
    png_data = sig + ihdr + idat + iend
    
    # ICO format
    # ICO header: reserved(2) + type(2) + count(2)
    ico_header = struct.pack('<HHH', 0, 1, 1)
    
    # Image directory entry: width(1) + height(1) + colorcount(1) + reserved(1) + planes(2) + bitcount(2) + size(4) + offset(4)
    img_offset = 6 + 16  # header + 1 directory entry
    img_size = len(png_data)
    dir_entry = struct.pack('<BBBBHHII', W, H, 0, 0, 1, 32, img_size, img_offset)
    
    ico_data = ico_header + dir_entry + png_data
    
    out = r'c:\Users\agity\Desktop\akgencler.com.tr\public\favicon.ico'
    with open(out, 'wb') as f:
        f.write(ico_data)
    
    print(f'favicon.ico yazildi: {os.path.getsize(out)} bytes')

make_ico()

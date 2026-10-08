const fs = require('fs');
const p = 'c:/Users/agity/Desktop/akgencler.com.tr/src/app/profil/[id]/page.tsx';
let c = fs.readFileSync(p, 'utf8');

c += '  return (\n    <PageLayout>\n      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>\n\n';
c += '        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", overflow: "hidden", marginBottom: 12 }}>\n';
c += '          <div style={{ position: "relative", height: 200, background: coverPhoto ? "transparent" : `linear-gradient(135deg,${user.avatarColor[0]},${user.avatarColor[1]})`, overflow: "hidden" }}>\n';
c += '            {coverPhoto && <img src={coverPhoto} alt="kapak" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}\n';
c += '            {isMe && (\n              <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", gap: 8 }}>\n';
c += '                <button onClick={() => coverInputRef.current?.click()} style={{ padding: "7px 14px", borderRadius: 20, border: "none", background: "rgba(0,0,0,0.55)", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>\uD83D\uDCF7 Kapak Ekle</button>\n';
c += '                {coverPhoto && <button onClick={() => { setCoverPhoto(null); showToast("Kapak kald\u0131r\u0131ld\u0131"); }} style={{ padding: "7px 14px", borderRadius: 20, border: "none", background: "rgba(230,57,70,0.85)", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>\uD83D\uDDD1\uFE0F Kald\u0131r</button>}\n';
c += '              </div>\n            )}\n';
c += '            <input ref={coverInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleCoverChange} />\n          </div>\n\n';
c += '          <div style={{ padding: "0 20px 20px" }}>\n';
c += '            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginTop: -44, marginBottom: 16 }}>\n';
c += '              <div style={{ position: "relative", flexShrink: 0 }}>\n';
c += '                <div style={{ width: 88, height: 88, borderRadius: "50%", border: "4px solid #fff", overflow: "hidden", background: "#eee", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>\n';
c += '                  {profilePhoto ? <img src={profilePhoto} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <Avatar name={user.name} size={88} color={user.avatarColor} />}\n                </div>\n';
c += '                {isMe && <button onClick={() => avatarInputRef.current?.click()} style={{ position: "absolute", bottom: 2, right: 2, width: 28, height: 28, borderRadius: "50%", border: "2px solid #fff", background: "#1a1a1a", color: "#fff", fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>\uD83D\uDCF7</button>}\n';
c += '                {isMe && profilePhoto && <button onClick={() => { setProfilePhoto(null); showToast("Foto\u011fraf kald\u0131r\u0131ld\u0131"); }} style={{ position: "absolute", top: 0, right: 0, width: 22, height: 22, borderRadius: "50%", border: "2px solid #fff", background: "#e63946", color: "#fff", fontSize: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>\u2715</button>}\n';
c += '                <input ref={avatarInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />\n              </div>\n\n';

fs.writeFileSync(p, c, 'utf8');
console.log('p2a ok:', c.length);

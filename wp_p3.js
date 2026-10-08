const fs = require('fs');
const p = 'c:/Users/agity/Desktop/akgencler.com.tr/src/app/profil/[id]/page.tsx';
let c = fs.readFileSync(p, 'utf8');

// Butonlar
c += '              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>\n';
c += '                {isMe ? (\n                  <>\n';
c += '                    <button onClick={openEdit} style={{ padding: "9px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>\u270F\uFE0F Profili D\u00fczenle</button>\n';
c += '                    <button onClick={() => setShareOpen(true)} style={{ padding: "9px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>\uD83D\uDD17 Payla\u015f</button>\n';
c += '                  </>\n                ) : (\n                  <>\n';
c += '                    <button onClick={() => isFollowing ? unfollowUser(user.id) : followUser(user.id)} style={{ padding: "9px 20px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer", background: isFollowing ? "#f3f4f6" : "#e63946", color: isFollowing ? "#374151" : "#fff" }}>{isFollowing ? "Takipten \u00c7\u0131k" : "+ Takip Et"}</button>\n';
c += '                    <button style={{ padding: "9px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>\uD83D\uDCAC Mesaj</button>\n';
c += '                    <button onClick={() => setShareOpen(true)} style={{ padding: "9px 14px", borderRadius: 20, fontSize: 16, fontWeight: 700, border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151", cursor: "pointer" }}>\u22EF</button>\n';
c += '                  </>\n                )}\n              </div>\n            </div>\n\n';

// Isim bio stats
c += '            <div>\n';
c += '              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>\n';
c += '                <h2 style={{ fontWeight: 800, fontSize: 20, margin: 0, color: "#111827" }}>{user.name}</h2>\n';
c += '                {user.verified && <span title="Do\u011frulanm\u0131\u015f" style={{ fontSize: 16 }}>\u2705</span>}\n              </div>\n';
c += '              <p style={{ color: "#6b7280", fontSize: 14, margin: "0 0 8px" }}>@{user.username}</p>\n';
c += '              {user.bio && <p style={{ fontSize: 14, color: "#374151", margin: "0 0 10px", lineHeight: 1.55 }}>{user.bio}</p>}\n';
c += '              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, fontSize: 13, color: "#6b7280", marginBottom: 14 }}>\n';
c += '                {user.location && <span>\uD83D\uDCCD {user.location}</span>}\n';
c += '                {user.website && <a href={user.website.startsWith("http") ? user.website : `https://${user.website}`} target="_blank" rel="noopener noreferrer" style={{ color: "#e63946", textDecoration: "none", fontWeight: 600 }}>\uD83D\uDD17 {user.website}</a>}\n';
c += '                <span>\uD83D\uDCC5 {new Date(user.joinedAt).toLocaleDateString("tr-TR", { month: "long", year: "numeric" })} kat\u0131ld\u0131</span>\n              </div>\n';
c += '              <div style={{ display: "flex", gap: 28 }}>\n';
c += '                <div style={{ textAlign: "center" }}><p style={{ fontWeight: 800, fontSize: 17, color: "#111827", margin: 0 }}>{userPosts.length}</p><p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>G\u00f6nderi</p></div>\n';
c += '                <div onClick={() => setFollowModal("followers")} style={{ textAlign: "center", cursor: "pointer" }}><p style={{ fontWeight: 800, fontSize: 17, color: "#111827", margin: 0 }}>{user.followers.length}</p><p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Takip\u00e7i</p></div>\n';
c += '                <div onClick={() => setFollowModal("following")} style={{ textAlign: "center", cursor: "pointer" }}><p style={{ fontWeight: 800, fontSize: 17, color: "#111827", margin: 0 }}>{user.following.length}</p><p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Takip</p></div>\n';
c += '              </div>\n            </div>\n          </div>\n        </div>\n\n';

// Hikayeler
c += '        {isMe && stories.filter(s => s.authorId === "me").length > 0 && (\n';
c += '          <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", padding: "16px 20px", marginBottom: 12 }}>\n';
c += '            <p style={{ fontWeight: 700, fontSize: 14, margin: "0 0 12px", color: "#374151" }}>Hikayelerim</p>\n';
c += '            <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>\n';
c += '              {stories.filter(s => s.authorId === "me").map(story => (\n';
c += '                <div key={story.id} style={{ flexShrink: 0, textAlign: "center" }}>\n';
c += '                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg,${story.gradient[0]},${story.gradient[1]})`, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #e63946", cursor: "pointer" }}>\n';
c += '                    <span style={{ fontSize: 24 }}>\uD83D\uDCD6</span>\n                  </div>\n';
c += '                  <p style={{ fontSize: 11, color: "#6b7280", margin: "4px 0 0", width: 64, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Hikaye</p>\n';
c += '                </div>\n              ))}\n            </div>\n          </div>\n        )}\n\n';

fs.writeFileSync(p, c, 'utf8');
console.log('p3 ok:', c.length);

const fs = require('fs');
const p = 'c:/Users/agity/Desktop/akgencler.com.tr/src/app/profil/[id]/page.tsx';
let c = fs.readFileSync(p, 'utf8');

// TABS
c += '        <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #eef0f2", overflow: "hidden" }}>\n';
c += '          <div style={{ display: "flex", borderBottom: "1px solid #eef0f2" }}>\n';
c += '            {TABS.map((t, i) => (\n';
c += '              <button key={t} onClick={() => setTab(i)} style={{ flex: 1, padding: "14px 0", fontSize: 13, fontWeight: tab === i ? 700 : 500, border: "none", cursor: "pointer", background: "transparent", color: tab === i ? "#e63946" : "#6b7280", borderBottom: tab === i ? "2px solid #e63946" : "2px solid transparent", transition: "all 0.2s" }}>\n';
c += '                {t}{i === 0 && userPosts.length > 0 && <span style={{ marginLeft: 4, fontSize: 11, background: "#f3f4f6", borderRadius: 10, padding: "1px 6px" }}>{userPosts.length}</span>}\n';
c += '              </button>\n            ))}\n          </div>\n\n';

// Grid/List toggle
c += '          {tab === 0 && (\n';
c += '            <div style={{ display: "flex", justifyContent: "flex-end", padding: "8px 16px", borderBottom: "1px solid #f3f4f6", gap: 4 }}>\n';
c += '              <button onClick={() => setViewMode("grid")} style={{ padding: "6px 12px", borderRadius: 10, border: "none", background: viewMode === "grid" ? "#fff1f2" : "transparent", color: viewMode === "grid" ? "#e63946" : "#9ca3af", cursor: "pointer", fontSize: 18 }}>\u22EE\u22EE</button>\n';
c += '              <button onClick={() => setViewMode("list")} style={{ padding: "6px 12px", borderRadius: 10, border: "none", background: viewMode === "list" ? "#fff1f2" : "transparent", color: viewMode === "list" ? "#e63946" : "#9ca3af", cursor: "pointer", fontSize: 18 }}>\u2630</button>\n';
c += '            </div>\n          )}\n\n';

// Icerik
c += '          <div style={{ padding: tab === 0 && viewMode === "grid" ? 2 : 12 }}>\n';
c += '            {displayed.length === 0 ? (\n';
c += '              <div style={{ padding: "48px 24px", textAlign: "center" }}><p style={{ fontSize: 40, margin: "0 0 12px" }}>\uD83D\uDCED</p><p style={{ fontSize: 14, color: "#9ca3af", margin: 0 }}>Hen\u00fcz i\u00e7erik yok.</p></div>\n';
c += '            ) : tab === 0 && viewMode === "grid" ? (\n';
c += '              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>\n';
c += '                {displayed.map(post => (\n';
c += '                  <div key={post.id} style={{ position: "relative", paddingBottom: "100%", overflow: "hidden", cursor: "pointer", background: "#f3f4f6" }}>\n';
c += '                    {post.imageUrl\n';
c += '                      ? <img src={post.imageUrl} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />\n';
c += '                      : <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 8, background: `linear-gradient(135deg,${user.avatarColor[0]}22,${user.avatarColor[1]}33)` }}><p style={{ fontSize: 11, color: "#374151", textAlign: "center", margin: 0, lineHeight: 1.4 }}>{post.content.substring(0, 80)}</p></div>}\n';
c += '                    <div style={{ position: "absolute", inset: 0, opacity: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, color: "#fff", fontSize: 13, fontWeight: 700, transition: "opacity 0.2s" }} onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = "1"} onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = "0"}>\n';
c += '                      <span>\u2764\uFE0F {post.likes.length}</span><span>\uD83D\uDCAC {post.comments.length}</span>\n';
c += '                    </div>\n                  </div>\n                ))}\n              </div>\n';
c += '            ) : (\n';
c += '              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>\n';
c += '                {displayed.map(post => <PostCard key={post.id} post={post} />)}\n';
c += '              </div>\n            )}\n          </div>\n        </div>\n      </div>\n\n';

fs.writeFileSync(p, c, 'utf8');
console.log('p4 ok:', c.length);
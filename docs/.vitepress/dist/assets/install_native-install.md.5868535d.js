import{_ as s,c as n,o as a,a as l}from"./app.fb78d42c.js";const A=JSON.parse('{"title":"\u539F\u751F\u5B89\u88C5","description":"","frontmatter":{},"headers":[{"level":2,"title":"\u5B89\u88C5 Apache Guacamole-Server","slug":"\u5B89\u88C5-apache-guacamole-server","link":"#\u5B89\u88C5-apache-guacamole-server","children":[]},{"level":2,"title":"\u5B89\u88C5\u5B57\u4F53\uFF08SSH\u4F7F\u7528\uFF09","slug":"\u5B89\u88C5\u5B57\u4F53-ssh\u4F7F\u7528","link":"#\u5B89\u88C5\u5B57\u4F53-ssh\u4F7F\u7528","children":[]},{"level":2,"title":"\u5B89\u88C5 Next Terminal","slug":"\u5B89\u88C5-next-terminal","link":"#\u5B89\u88C5-next-terminal","children":[]}],"relativePath":"install/native-install.md"}'),e={name:"install/native-install.md"},p=l(`<h1 id="\u539F\u751F\u5B89\u88C5" tabindex="-1">\u539F\u751F\u5B89\u88C5 <a class="header-anchor" href="#\u539F\u751F\u5B89\u88C5" aria-hidden="true">#</a></h1><h2 id="\u5B89\u88C5-apache-guacamole-server" tabindex="-1">\u5B89\u88C5 Apache Guacamole-Server <a class="header-anchor" href="#\u5B89\u88C5-apache-guacamole-server" aria-hidden="true">#</a></h2><p>\u6267\u884C\u5B89\u88C5\u547D\u4EE4</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">yum install -y epel-release</span></span>
<span class="line"><span style="color:#A6ACCD;">yum install -y libguac-client-kubernetes \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    libguac-client-rdp \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    libguac-client-ssh \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    libguac-client-telnet \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    libguac-client-vnc \\</span></span>
<span class="line"><span style="color:#A6ACCD;">    guacd</span></span>
<span class="line"></span></code></pre></div><p>\u914D\u7F6E guacd \u670D\u52A1</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">mkdir /etc/guacamole/ </span><span style="color:#89DDFF;">&amp;&amp;</span><span style="color:#A6ACCD;"> cat </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#C3E88D;"> &gt;&gt; /etc/guacamole/guacd.conf</span></span>
<span class="line"><span style="color:#C3E88D;">[daemon]</span></span>
<span class="line"><span style="color:#C3E88D;">pid_file = /var/run/guacd.pid</span></span>
<span class="line"><span style="color:#C3E88D;">log_level = info</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">[server]</span></span>
<span class="line"><span style="color:#C3E88D;"># \u76D1\u542C\u5730\u5740</span></span>
<span class="line"><span style="color:#C3E88D;">bind_host = 127.0.0.1</span></span>
<span class="line"><span style="color:#C3E88D;">bind_port = 4822</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span>
<span class="line"></span></code></pre></div><p>\u4E3A\u4E86\u907F\u514D\u6743\u9650\u95EE\u9898\u5BFC\u81F4\u9519\u8BEF\u4FEE\u6539\u4F7F\u7528 root \u7528\u6237\u542F\u52A8guacd\u670D\u52A1\uFF0C\u4FEE\u6539 <code>/usr/lib/systemd/system/guacd.service</code> \u6587\u4EF6\uFF0C\u6CE8\u91CA\u6389 User \u548C Group \u8FD9\u4E24\u884C\u3002</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">Unit</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">Description=Guacamole proxy daemon</span></span>
<span class="line"><span style="color:#A6ACCD;">Documentation=man:guacd</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">8</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">Service</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">EnvironmentFile=-/etc/sysconfig/guacd</span></span>
<span class="line"><span style="color:#A6ACCD;">Environment=HOME=/var/lib/guacd</span></span>
<span class="line"><span style="color:#A6ACCD;">ExecStart=/usr/sbin/guacd -f </span><span style="color:#89DDFF;">$</span><span style="color:#A6ACCD;">OPTS</span></span>
<span class="line"><span style="color:#A6ACCD;">Restart=on-failure</span></span>
<span class="line"><span style="color:#A6ACCD;">LimitNOFILE=1048576</span></span>
<span class="line"><span style="color:#676E95;"># User=guacd</span></span>
<span class="line"><span style="color:#676E95;"># Group=guacd</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">Install</span><span style="color:#89DDFF;">]</span></span>
<span class="line"><span style="color:#A6ACCD;">WantedBy=multi-user.target</span></span>
<span class="line"></span></code></pre></div><p>\u542F\u52A8 guacd \u670D\u52A1</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u91CD\u8F7D\u670D\u52A1</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#676E95;"># \u5F00\u673A\u81EA\u542F</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl </span><span style="color:#82AAFF;">enable</span><span style="color:#A6ACCD;"> guacd</span></span>
<span class="line"><span style="color:#676E95;"># \u542F\u52A8\u670D\u52A1</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl start guacd</span></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl status guacd</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5B89\u88C5\u5B57\u4F53-ssh\u4F7F\u7528" tabindex="-1">\u5B89\u88C5\u5B57\u4F53\uFF08SSH\u4F7F\u7528\uFF09 <a class="header-anchor" href="#\u5B89\u88C5\u5B57\u4F53-ssh\u4F7F\u7528" aria-hidden="true">#</a></h2><p>\u5B89\u88C5\u5B57\u4F53\u7BA1\u7406\u8F6F\u4EF6</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">yum install -y fontconfig mkfontscale</span></span>
<span class="line"></span></code></pre></div><p>\u4E0B\u8F7D\u5B57\u4F53\u6587\u4EF6\u5E76\u79FB\u52A8\u5230 /usr/share/fonts/\u76EE\u5F55\u4E0B</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#82AAFF;">cd</span><span style="color:#A6ACCD;">  /usr/share/fonts/</span></span>
<span class="line"><span style="color:#676E95;"># \u4E0B\u8F7D\u82F1\u6587\u5B57\u4F53</span></span>
<span class="line"><span style="color:#A6ACCD;">wget https://gitee.com/dushixiang/next-terminal/raw/master/guacd/fonts/Menlo-Regular.ttf</span></span>
<span class="line"><span style="color:#676E95;"># \u4E0B\u8F7D\u4E2D\u6587\u5B57\u4F53</span></span>
<span class="line"><span style="color:#A6ACCD;">wget https://gitee.com/dushixiang/next-terminal/raw/master/guacd/fonts/SourceHanSansCN-Regular.otf</span></span>
<span class="line"></span></code></pre></div><p>\u66F4\u65B0\u5B57\u4F53</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">mkfontscale</span></span>
<span class="line"><span style="color:#A6ACCD;">mkfontdir</span></span>
<span class="line"><span style="color:#A6ACCD;">fc-cache</span></span>
<span class="line"></span></code></pre></div><h2 id="\u5B89\u88C5-next-terminal" tabindex="-1">\u5B89\u88C5 Next Terminal <a class="header-anchor" href="#\u5B89\u88C5-next-terminal" aria-hidden="true">#</a></h2><blockquote><p>\u793A\u4F8B\u6B65\u9AA4\u5B89\u88C5\u5728 <code>/usr/local/next-terminal</code>\uFF0C\u4F60\u53EF\u4EE5\u81EA\u7531\u9009\u62E9\u5B89\u88C5\u76EE\u5F55\u3002</p></blockquote><p>\u4E0B\u8F7D</p><blockquote><p>\u56FD\u5185\u7528\u6237\u5982\u679C\u8BBF\u95EE\u4E0D\u5230GitHub\uFF0C\u53EF\u4ECE Gitee \u8FDB\u884C\u4E0B\u8F7D\uFF0C\u5730\u5740\u4E3A: <a href="https://gitee.com/dushixiang/next-terminal" target="_blank" rel="noreferrer">https://gitee.com/dushixiang/next-terminal</a></p></blockquote><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">wget https://github.com/dushixiang/next-terminal/releases/latest/download/next-terminal.tgz</span></span>
<span class="line"></span></code></pre></div><p>\u89E3\u538B</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">tar -zxvf next-terminal.tgz -C /usr/local/</span></span>
<span class="line"></span></code></pre></div><p>\u5728<code>/usr/local/next-terminal</code>\u6216<code>/etc/next-terminal</code>\u4E0B\u521B\u5EFA\u6216\u4FEE\u6539\u914D\u7F6E\u6587\u4EF6<code>config.yml</code></p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">db: sqlite</span></span>
<span class="line"><span style="color:#676E95;"># \u5F53db\u4E3Asqlite\u65F6mysql\u7684\u914D\u7F6E\u65E0\u6548</span></span>
<span class="line"><span style="color:#676E95;">#mysql:</span></span>
<span class="line"><span style="color:#676E95;">#  hostname: 172.16.101.32</span></span>
<span class="line"><span style="color:#676E95;">#  port: 3306</span></span>
<span class="line"><span style="color:#676E95;">#  username: root</span></span>
<span class="line"><span style="color:#676E95;">#  password: mysql</span></span>
<span class="line"><span style="color:#676E95;">#  database: next-terminal</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u5F53db\u4E3Amysql\u65F6sqlite\u7684\u914D\u7F6E\u65E0\u6548</span></span>
<span class="line"><span style="color:#A6ACCD;">sqlite:</span></span>
<span class="line"><span style="color:#A6ACCD;">  file: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">next-terminal.db</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">server:</span></span>
<span class="line"><span style="color:#A6ACCD;">  addr: 0.0.0.0:8088</span></span>
<span class="line"><span style="color:#676E95;"># \u5F53\u8BBE\u7F6E\u4E0B\u9762\u4E24\u4E2A\u53C2\u6570\u65F6\u4F1A\u81EA\u52A8\u5F00\u542Fhttps\u6A21\u5F0F(\u524D\u63D0\u662F\u8BC1\u4E66\u6587\u4EF6\u5B58\u5728)</span></span>
<span class="line"><span style="color:#676E95;">#  cert: /root/next-terminal/cert.pem</span></span>
<span class="line"><span style="color:#676E95;">#  key: /root/next-terminal/key.pem</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;"># \u6388\u6743\u51ED\u8BC1\u548C\u8D44\u4EA7\u7684\u5BC6\u7801\uFF0C\u5BC6\u94A5\u7B49\u654F\u611F\u4FE1\u606F\u52A0\u5BC6\u7684key\uFF0C\u9ED8\u8BA4\`next-terminal\`</span></span>
<span class="line"><span style="color:#676E95;">#encryption-key: next-terminal</span></span>
<span class="line"><span style="color:#A6ACCD;">guacd:</span></span>
<span class="line"><span style="color:#A6ACCD;">  hostname: 127.0.0.1</span></span>
<span class="line"><span style="color:#A6ACCD;">  port: 4822</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># \u6B64\u8DEF\u5F84\u9700\u8981\u4E3A\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u5E76\u4E14next-terminal\u548Cguacd\u90FD\u80FD\u8BBF\u95EE\u5230</span></span>
<span class="line"><span style="color:#A6ACCD;">  recording: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/usr/local/next-terminal/data/recording</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># \u6B64\u8DEF\u5F84\u9700\u8981\u4E3A\u7EDD\u5BF9\u8DEF\u5F84\uFF0C\u5E76\u4E14next-terminal\u548Cguacd\u90FD\u80FD\u8BBF\u95EE\u5230</span></span>
<span class="line"><span style="color:#A6ACCD;">  drive: </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">/usr/local/next-terminal/data/drive</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">sshd:</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># \u662F\u5426\u5F00\u542Fsshd\u670D\u52A1</span></span>
<span class="line"><span style="color:#A6ACCD;">  enable: </span><span style="color:#82AAFF;">false</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># sshd \u76D1\u542C\u5730\u5740\uFF0C\u672A\u5F00\u542Fsshd\u670D\u52A1\u65F6\u6B64\u914D\u7F6E\u4E0D\u4F1A\u4F7F\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">  addr: 0.0.0.0:8089</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;"># sshd \u4F7F\u7528\u7684\u79C1\u94A5\u5730\u5740\uFF0C\u672A\u5F00\u542Fsshd\u670D\u52A1\u65F6\u6B64\u914D\u7F6E\u4E0D\u4F1A\u4F7F\u7528</span></span>
<span class="line"><span style="color:#A6ACCD;">  key: </span><span style="color:#89DDFF;">~</span><span style="color:#A6ACCD;">/.ssh/id_rsa</span></span>
<span class="line"></span></code></pre></div><p>\u542F\u52A8</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">./next-terminal</span></span>
<span class="line"></span></code></pre></div><p>\u4F7F\u7528\u7CFB\u7EDF\u670D\u52A1\u65B9\u5F0F\u542F\u52A8</p><p>\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\u521B\u5EFA next-terminal \u7CFB\u7EDF\u670D\u52A1\u6587\u4EF6</p><div class="language-bash"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">cat </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#89DDFF;">EOF</span><span style="color:#C3E88D;"> &gt;&gt; /etc/systemd/system/next-terminal.service</span></span>
<span class="line"><span style="color:#C3E88D;">[Unit]</span></span>
<span class="line"><span style="color:#C3E88D;">Description=next-terminal service</span></span>
<span class="line"><span style="color:#C3E88D;">After=network.target</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">[Service]</span></span>
<span class="line"><span style="color:#C3E88D;">User=root</span></span>
<span class="line"><span style="color:#C3E88D;">WorkingDirectory=/usr/local/next-terminal</span></span>
<span class="line"><span style="color:#C3E88D;">ExecStart=/usr/local/next-terminal/next-terminal</span></span>
<span class="line"><span style="color:#C3E88D;">Restart=on-failure</span></span>
<span class="line"><span style="color:#C3E88D;">LimitNOFILE=1048576</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C3E88D;">[Install]</span></span>
<span class="line"><span style="color:#C3E88D;">WantedBy=multi-user.target</span></span>
<span class="line"><span style="color:#89DDFF;">EOF</span></span>
<span class="line"></span></code></pre></div><p>\u542F\u52A8 Next-Terminal \u670D\u52A1</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki"><code><span class="line"><span style="color:#676E95;"># \u91CD\u8F7D\u670D\u52A1</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl daemon-reload</span></span>
<span class="line"><span style="color:#676E95;"># \u5F00\u673A\u542F\u52A8</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl </span><span style="color:#82AAFF;">enable</span><span style="color:#A6ACCD;"> next-terminal</span></span>
<span class="line"><span style="color:#676E95;"># \u542F\u52A8\u670D\u52A1</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl start next-terminal</span></span>
<span class="line"><span style="color:#676E95;"># \u67E5\u770B\u72B6\u6001</span></span>
<span class="line"><span style="color:#A6ACCD;">systemctl status next-terminal</span></span>
<span class="line"></span></code></pre></div>`,33),o=[p];function c(t,r,i,y,d,C){return a(),n("div",null,o)}const u=s(e,[["render",c]]);export{A as __pageData,u as default};

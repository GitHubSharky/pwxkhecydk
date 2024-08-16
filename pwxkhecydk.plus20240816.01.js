var e = {
    d: (t, n) => {
        for (var o in n) e.o(n, o) && !e.o(t, o) && Object.defineProperty(t, o, {
            enumerable: !0,
            get: n[o]
        })
    },
    o: (e, t) => Object.prototype.hasOwnProperty.call(e, t)
},
    t = {};
e.d(t, {
    D: () => r
});
class n {
    constructor(e, t) {
        this.orderedPosts = [], this.url = "#main", this.downloadObj = {
            posts: {},
            id: e
        }, this.utils = t
    }
    stringify() {
        var e;
        const t = {
            posts: this.orderedPosts.map((e => e.toJsonObjBy(this.downloadObj.posts))),
            id: this.downloadObj.id,
            url: this.url,
            tags: null !== (e = this.tags) && void 0 !== e ? e : this.collectTags(),
            postCount: this.countPost(),
            fileCount: this.countFile()
        };
        return JSON.stringify(t)
    }
    setUrl(e) {
        this.url = e
    }
    setTags(e) {
        this.tags = e
    }
    addPost(e) {
        const t = this.utils.encodeFileName(e);
        void 0 === this.downloadObj.posts[t] && (this.downloadObj.posts[t] = []);
        const n = {
            name: e,
            info: "",
            files: {},
            html: "",
            tags: []
        };
        this.downloadObj.posts[t].push(n);
        const s = new o(n, this.utils);
        return this.orderedPosts.push(s), s
    }
    countPost() {
        return Object.values(this.downloadObj.posts).reduce(((e, t) => e + t.length),
            0)
    }
    countFile() {
        return Object.values(this.downloadObj.posts).reduce(((e, t) => e + t.reduce(
            ((e, t) => e + Object.values(t.files).reduce(((e, t) => e + t.length), 0)),
            0)), 0)
    }
    collectTags() {
        const e = new Set;
        return Object.values(this.downloadObj.posts).forEach((t => t.forEach((t => t
            .tags.forEach((t => e.add(t))))))), [...e]
    }
}
class o {
    constructor(e, t) {
        this.postObj = e, this.utils = t
    }
    setInfo(e) {
        this.postObj.info = e
    }
    setHtml(e) {
        this.postObj.html = e
    }
    setTags(e) {
        this.postObj.tags = e
    }
    setCover(e, t, n) {
        const o = {
            name: e,
            extension: t ? `.${t}` : "",
            url: n
        };
        return this.postObj.cover = o, new s(o, this.utils)
    }
    addFile(e, t, n) {
        const o = this.utils.encodeFileName(e);
        void 0 === this.postObj.files[o] && (this.postObj.files[o] = []);
        const i = {
            name: e,
            extension: t ? `.${t}` : "",
            url: n
        };
        return this.postObj.files[o].push(i), new s(i, this.utils)
    }
    getAutoAssignedLinkTag(e) {
        const t = e.getEncodedExtension();
        switch (!0) {
            case this.utils.isAudio(t):
                return this.getAudioLinkTag(e);
            case this.utils.isImage(t):
                return this.getImageLinkTag(e);
            case this.utils.isVideo(t):
                return this.getVideoLinkTag(e);
            default:
                return this.getFileLinkTag(e)
        }
    }
    getAudioLinkTag(e) {
        const t = this.getCurrentFilePath(e);
        return
        `<a class="hl" href="${t}" download="${e.getEncodedName() + e.getEncodedExtension()}"><div class="post card">\n<div class="card-header">${e.getOriginalName()}</div>\n<audio class="card-img-top" src="${t}" controls/>\n</div></a>`
    }
    getLinkTag(e, t) {
        return
        `<a class="hl" href="${e}"><div class="post card text-center"><p class="pt-2">\n<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-left" viewBox="0 0 16 16">\n<path fill-rule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5z"/>\n<path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0v-5z"/>\n</svg> ${t}</p></div></a>`
    }
    getFileLinkTag(e) {
        return
        `<a class="hl" href="${this.getCurrentFilePath(e)}" download="${e.getEncodedName() + e.getEncodedExtension()}"><div class="post card text-center"><p class="pt-2">\n<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">\n<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>\n<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>\n</svg> ${e.getOriginalName() + e.getOriginalExtension()}</p></div></a>`
    }
    getImageLinkTag(e) {
        const t = this.getCurrentFilePath(e);
        return
        `<a class="hl" href="${t}" download="${e.getEncodedName() + e.getEncodedExtension()}"><div class="post card">\n<img class="card-img-top" src="${t}" alt="${e.getOriginalName()}"/>\n</div></a>`
    }
    getVideoLinkTag(e) {
        const t = this.getCurrentFilePath(e);
        return
        `<a class="hl" href="${t}" download="${e.getEncodedName() + e.getEncodedExtension()}"><div class="post card">\n<video class="card-img-top" src="${t}" controls/>\n</div></a>`
    }
    getCurrentFilePath(e) {
        const t = e.getEncodedName();
        if (e.equals(this.postObj.cover)) {
            const n = this.utils.getFileName(t, e.getEncodedExtension(), 1, 0, !0);
            return `./${this.utils.encodeURI(n)}`
        }
        if (void 0 === this.postObj.files[t]) throw new Error(
            `file object is undefined: ${e.getOriginalName()}`);
        const n = this.postObj.files[t].findIndex((t => e.equals(t)));
        if (n < 0) throw new Error(
            `file object is not found: ${e.getOriginalName()}`);
        const o = this.utils.getFileName(t, e.getEncodedExtension(), this.postObj.files[
            t].length, n, !0);
        return `./${this.utils.encodeURI(o)}`
    }
    toJsonObjBy(e) {
        var t;
        const n = this.utils.encodeFileName(this.postObj.name),
            o = null === (t = e[n]) || void 0 === t ? void 0 : t.indexOf(this.postObj);
        if (void 0 === o || o < 0) throw new Error(
            `post object is not found: ${this.postObj.name}`);
        const s = this.utils.getFileName(n, "", e[n].length, o, !1),
            i = this.postObj.cover ? {
                url: this.postObj.cover.url,
                name: this.utils.getFileName(this.postObj.cover.name, this.postObj.cover.extension,
                    1, 0, !0)
            } : void 0;
        return {
            originalName: this.postObj.name,
            encodedName: s,
            informationText: this.postObj.info,
            htmlText: this.postObj.html,
            files: this.collectFiles(),
            tags: this.postObj.tags,
            cover: i
        }
    }
    collectFiles() {
        const e = [];
        for (const [t, n] of Object.entries(this.postObj.files)) {
            let o = 0;
            for (const s of n) {
                const i = s.extension ? this.utils.encodeFileName(s.extension) : "",
                    a = this.utils.getFileName(t, i, n.length, o++, !0);
                e.push({
                    url: s.url,
                    originalName: s.name,
                    encodedName: a
                })
            }
        }
        return e
    }
}
class s {
    constructor(e, t) {
        this.fileObj = e, this.utils = t
    }
    getEncodedName() {
        return this.utils.encodeFileName(this.fileObj.name)
    }
    getEncodedExtension() {
        return this.utils.encodeFileName(this.fileObj.extension)
    }
    getOriginalName() {
        return this.fileObj.name
    }
    getOriginalExtension() {
        return this.fileObj.extension
    }
    getUrl() {
        return this.fileObj.url
    }
    equals(e) {
        return "object" == typeof e && e.name === this.fileObj.name && e.url ===
            this.fileObj.url
    }
}
class i {
    constructor(e) {
        this.bootCSS = {
            href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css",
            integrity: "sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
        }, this.bootJS = {
            src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js",
            integrity: "sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
        }, this.vueJS = {
            src: "https://unpkg.com/vue@3.2.28/dist/vue.global.js"
        }, this.utils = e
    }
    async createDownloadUI(e) {
        document.head.innerHTML = "", document.body.innerHTML = "", document.getElementsByTagName(
            "html")[0].style.height = "100%", document.body.style.height = "100%",
            document.body.style.margin = "0", document.title = e;
        let t = document.createElement("link");
        t.href = this.bootCSS.href, t.rel = "stylesheet", t.integrity = this.bootCSS
            .integrity, t.crossOrigin = "anonymous", document.head.appendChild(t);
        let n = document.createElement("div");
        n.style.display = "flex", n.style.alignItems = "center", n.style.justifyContent =
            "center", n.style.flexDirection = "column", n.style.height = "100%";
        let o = document.createElement("div");
        o.className = "input-group mb-2", o.style.width = "400px";
        let s = document.createElement("input");
        s.type = "text", s.className = "form-control", s.placeholder =
            "ここにJSONを貼り付け", o.appendChild(s);
        let i = document.createElement("div");
        i.className = "input-group-append";
        let a = document.createElement("button");
        a.className = "btn btn-outline-secondary btn-labeled", a.type = "button", a.innerText =
            "Download", i.appendChild(a), o.appendChild(i), n.appendChild(o);
        let r = document.createElement("div");
        r.className = "progress mb-3", r.style.width = "400px";
        let l = document.createElement("div");
        l.className = "progress-bar", l.role = "progressbar", l["aria-valuemin"] =
            "0", l["aria-valuemax"] = "100", l["aria-valuenow"] = "0", l.style.width =
            "0%", l.innerText = "0%";
        const c = e => {
            l["aria-valuenow"] = `${e}`, l.style.width = `${e}%`, l.innerText =
                `${e}%`
        };
        r.appendChild(l), n.appendChild(r);
        let d = document.createElement("div");
        d.style.width = "350px";
        let u = document.createElement("div");
        u.className = "form-check float-start";
        let h = document.createElement("input");
        h.className = "form-check-input", h.type = "checkbox", h.id = "LogCheck", h.checked = !
            0, u.appendChild(h);
        let p = document.createElement("label");
        p.className = "form-check-label", p.for = "LogCheck", p.innerText =
            "ログを自動スクロール", u.appendChild(p), d.appendChild(u);
        let m = document.createElement("div");
        m.className = "float-end", m.innerText = "残りおよそ -:--";
        const g = e => m.innerText = `残りおよそ ${e}`;
        d.appendChild(m), n.appendChild(d);
        let f = document.createElement("textarea");
        f.className = "form-control", f.readOnly = !0, f.style.resize = "both", f.style
            .width = "500px", f.style.height = "80px";
        const b = e => {
            f.value += `${e}\n`, h.checked && (f.scrollTop = f.scrollHeight)
        };
        n.appendChild(f), document.body.appendChild(n);
        let v = document.createElement("script");
        v.src = this.bootJS.src, v.integrity = this.bootJS.integrity, v.crossOrigin =
            "anonymous", document.body.appendChild(v);
        const y = this.downloadZip.bind(this);
        a.onclick = async () => {
            a.disabled = !0;
            const e = e => e.returnValue = "downloading";
            window.addEventListener("beforeunload", e);
            try {
                await y(JSON.parse(s.value), c, b, g)
            } catch (e) {
                b("エラー出た"), console.error(e)
            } finally {
                window.removeEventListener("beforeunload", e)
            }
        }
    }
    async downloadZip(e, t, n, o) {
        if (!this.isDownloadJsonObj(e)) throw new Error("ダウンロード対象オブジェクトの型が不正");
        const s = this,
            i = this.utils;
        await i.embedScript(
            "https://cdn.jsdelivr.net/npm/web-streams-polyfill@2.0.2/dist/ponyfill.min.js"
        ), await i.embedScript(
            "https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/StreamSaver.js"), await i.embedScript(
                "https://cdn.jsdelivr.net/npm/streamsaver@2.0.3/examples/zip-stream.js");
        const a = i.encodeFileName(e.id),
            r = streamSaver.createWriteStream(`${a}.zip`),
            l = new createWriter({
                async pull(r) {
                    const l = Math.floor(Date.now() / 1e3);
                    let c = 0;
                    const d = (e, t) => r.enqueue(new File(e, `${a}/${t}`));
                    n(`@${e.id} 投稿:${e.postCount} ファイル:${e.fileCount}`), d([s.createRootHtmlFromPosts(
                        e)], "index.html");
                    let u = 0;
                    for (const a of e.posts) {
                        n(`${a.originalName} (${++u}/${e.postCount})`);
                        const r = i.createInformationFile(a.informationText);
                        if (d(r.content, `${a.encodedName}/${i.encodeFileName(r.name)}`), d([s
                            .createHtmlFromBody(a.originalName, a.htmlText)
                        ], `${a.encodedName}/index.html`), a.cover) {
                            n(`download ${a.cover.name}`);
                            const e = await i.fetchWithLimit(a.cover, 1);
                            e && d([e], `${a.encodedName}/${a.cover.name}`)
                        }
                        let h = 0;
                        for (const s of a.files) {
                            n(`download ${s.encodedName} (${++h}/${a.files.length})`);
                            const r = await i.fetchWithLimit({
                                url: s.url,
                                name: s.encodedName
                            }, 1);
                            r ? d([r], `${a.encodedName}/${s.encodedName}`) : (console.error(
                                `${s.encodedName}(${s.url})のダウンロードに失敗、読み飛ばすよ`), n(
                                    `${s.encodedName}のダウンロードに失敗`)), c++, setTimeout((() => {
                                        const n = Math.floor(Math.abs(Math.floor(Date.now() / 1e3) - l) *
                                            (e.fileCount - c) / c),
                                            s = n / 3600 | 0,
                                            i = Math.ceil((n - 3600 * s) / 60);
                                        o(`${s}:${("00" + i).slice(-2)}`), t(100 * c / e.fileCount | 0)
                                    }), 0), await i.sleep(100)
                        }
                    }
                    r.close()
                }
            });
        if (window.WritableStream && l.pipeTo) return l.pipeTo(r).then((() =>
            console.log("done writing")));
        const c = r.getWriter(),
            d = l.getReader(),
            u = () => d.read().then((e => e.done ? c.close() : c.write(e.value).then(u)));
        await u()
    }
    isDownloadJsonObj(e) {
        switch (!0) {
            case "object" != typeof e:
                return console.error("ダウンロード用オブジェクトの型が不正(対象がobjectでない)", e), !1;
            case "number" != typeof e.postCount:
                return console.error("ダウンロード用オブジェクトの型が不正(postCountが数値でない)", e.postCount), !
                    1;
            case "number" != typeof e.fileCount:
                return console.error("ダウンロード用オブジェクトの型が不正(fileCountが数値でない)", e.fileCount), !
                    1;
            case "string" != typeof e.id:
                return console.error("ダウンロード用オブジェクトの型が不正(idが文字列でない)", e.id), !1;
            case "string" != typeof e.url:
                return console.error("ダウンロード用オブジェクトの型が不正(urlが文字列でない)", e.url), !1;
            case !Array.isArray(e.posts):
                return console.error("ダウンロード用オブジェクトの型が不正(postsが配列でない)", e.posts), !1;
            case !Array.isArray(e.tags):
                return console.error("ダウンロード用オブジェクトの型が不正(tagsが配列でない)", e.tags), !1
        }
        return !e.posts.some((t => {
            switch (!0) {
                case "object" != typeof t:
                    return console.error("ダウンロード用オブジェクトの型が不正(postsの値にobjectでないものが含まれる)", t,
                        e.posts), !0;
                case "string" != typeof t.informationText:
                    return console.error(
                        "ダウンロード用オブジェクトの型が不正(postsの値にinformationTextが文字列でないものが含まれる)", t.informationText,
                        e.posts), !0;
                case "string" != typeof t.htmlText:
                    return console.error(
                        "ダウンロード用オブジェクトの型が不正(postsの値にhtmlTextが文字列でないものが含まれる)", t.htmlText, e.posts
                    ), !0;
                case !Array.isArray(t.files):
                    return console.error("ダウンロード用オブジェクトの型が不正(postsの値にfilesが配列でないものが含まれる)",
                        t.files, e.posts), !0;
                case !Array.isArray(t.tags):
                    return console.error("ダウンロード用オブジェクトの型が不正(postsの値にtagsが配列でないものが含まれる)",
                        t.tags, e.posts), !0;
                case t.files.some((n => {
                    var o, s, i, a;
                    switch (!0) {
                        case "object" != typeof n:
                            return console.error(
                                "ダウンロード用オブジェクトの型が不正(postsのfilesの値にオブジェクトでないものが含まれる)", n, t.files
                            ), !0;
                        case "string" != typeof n.url:
                            return console.error(
                                "ダウンロード用オブジェクトの型が不正(postsのfilesの値にurlが文字列でないものが含まれる)", n.url, t.files
                            ), !0;
                        case "string" != typeof n.originalName:
                            return console.error(
                                "ダウンロード用オブジェクトの型が不正(postsのfilesの値にoriginalNameが文字列でないものが含まれる)",
                                n.originalName, t.files), !0;
                        case "string" != typeof n.encodedName:
                            return console.error(
                                "ダウンロード用オブジェクトの型が不正(postsのfilesの値にencodedNameが文字列でないものが含まれる)", n
                                .encodedName, t.files), !0;
                        case void 0 === t.cover:
                            return !1;
                        case "object" != typeof t.cover:
                            return console.error(
                                "ダウンロード用オブジェクトの型が不正(postsの値にcoverがobjectでないものが含まれる)", t.cover, e
                                .posts), !0;
                        case "string" != typeof (null === (o = t.cover) || void 0 === o ?
                            void 0 : o.url):
                            return console.error(
                                "ダウンロード用オブジェクトの型が不正(postsのcoverの値にurlが文字列でないものが含まれる)", null ===
                                    (s = t.cover) || void 0 === s ? void 0 : s.url, t.cover), !0;
                        case "string" != typeof (null === (i = t.cover) || void 0 === i ?
                            void 0 : i.name):
                            return console.error(
                                "ダウンロード用オブジェクトの型が不正(postsのcoverの値にnameが文字列でないものが含まれる)", null ===
                                    (a = t.cover) || void 0 === a ? void 0 : a.name, t.cover), !0;
                        default:
                            return !1
                    }
                })):
                    return !0;
                default:
                    return !1
            }
        }))
    }
    createRootHtmlFromPosts(e) {
        return
        `<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="utf-8" />\n<title>${e.id}</title>\n<link href="${this.bootCSS.href}" rel="stylesheet" integrity="${this.bootCSS.integrity}" crossOrigin="anonymous">\n<style>div.main{width: 600px; float: none; margin: 65px auto 0}div.root{width: 400px}div.post{width: 600px}a.hl,a.hl:hover{color: inherit;text-decoration: none;}div.card{float: none; margin: 0 auto;}img.gray-card{height: 210px;background-color: gray;}div.gray-carousel{height: 210px; width: 400px;background-color: gray;}img.pd-carousel{height: 210px; padding: 15px;}</style>\n</head>\n<body>\n<div class="main" id="main">\n<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"><div class="container-fluid">\n<a class="navbar-brand" href="${e.url}">${e.id}</a>\n<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#dd" aria-controls="dd" aria-expanded="false" aria-label="Toggle navigation">\n<span class="navbar-toggler-icon"></span>\n</button>\n<div class="collapse navbar-collapse" id="dd"><ul class="navbar-nav">\n<li class="nav-item dropdown">\n<a class="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">Tags</a>\n<ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dd">\n<li v-for="(tag,i) in [${e.tags.map((e => this.utils.toQuoted(e))).join(",")}]">\n <div class="form-check mx-1">\n<input class="form-check-input" type="checkbox" v-model="selected" :value="tag" :id="'box'+(i+1)">\n<label class="form-check-label" :for="'box'+(i+1)">{{tag}}</label>\n</div>\n</li>\n</ul>\n</li>\n</ul></div>\n</div></nav>\n\n` +
            e.posts.map((e =>
                `<div v-show="isVisible([${e.tags.map((e => this.utils.toQuoted(e))).join(", ")}], selected)">\n<a class="hl" href="./${this.utils.encodeURI(e.encodedName)}/index.html"><div class="root card">\n` +
                this.createCoverHtmlFromPost(e) +
                `<div class="card-body"><h5 class="card-title">${e.originalName}</h5></div>\n</div></a><br>\n</div>\n`
            )).join("\n") +
            `\n</div>\n<script src="${this.vueJS.src}"><\/script>\n<script>\nVue.createApp({\ndata() {return { selected: [] }},methods: {\n isVisible(tags, selected) {\n  if (!selected.length) return true\n  return selected.every(it => tags.includes(it))\n }\n}\n}).mount('#main')\n<\/script>\n<script src="${this.bootJS.src}" integrity="${this.bootJS.integrity}" crossOrigin="anonymous"><\/script>\n</body></html>`
    }
    createCoverHtmlFromPost(e) {
        const t = `./${this.utils.encodeURI(e.encodedName)}/`;
        if (e.cover) return
        `<img class="card-img-top gray-card" src="${t}${this.utils.encodeURI(e.cover.name)}" alt="カバー画像"/>\n`;
        const n = e.files.filter((e => this.utils.isImage(e.encodedName)));
        return n.length > 0 ?
            '<div class="carousel slide" data-bs-ride="carousel" data-interval="1000"><div class="carousel-inner">\n<div class="carousel-item active">' +
            n.map((e =>
                `<div class="d-flex justify-content-center gray-carousel"><img src="${t}${this.utils.encodeURI(e.encodedName)}" class="d-block pd-carousel" height="180px"/></div>`
            )).join('</div>\n<div class="carousel-item">') + "</div>\n</div></div>\n" :
            '<img class="card-img-top gray-card"/>\n'
    }
    createHtmlFromBody(e, t) {
        return
        `<!DOCTYPE html>\n<html lang="ja">\n<head>\n<meta charset="utf-8" />\n<title>${e}</title>\n<link href="${this.bootCSS.href}" rel="stylesheet" integrity="${this.bootCSS.integrity}" crossOrigin="anonymous">\n<style>div.main{width: 600px; float: none; margin: 0 auto}div.root{width: 400px}div.post{width: 600px}a.hl,a.hl:hover{color: inherit;text-decoration: none;}div.card{float: none; margin: 0 auto;}img.gray-card{height: 210px;background-color: gray;}div.gray-carousel{height: 210px; width: 400px;background-color: gray;}img.pd-carousel{height: 210px; padding: 15px;}</style>\n</head>\n<body>\n<div class="main">\n${t}\n</div>\n<script src="${this.bootJS.src}" integrity="${this.bootJS.integrity}" crossOrigin="anonymous"><\/script>\n</body></html>`
    }
}
class a {
    constructor(e, t) {
        this.userId = e, this.feeMap = t, this.isIgnoreFree = !1, this.fees = [],
            this.tags = [], this.isLimitAvailable = !1, this.limit = 0, this.downloadObject =
            new n(e, a.utils)
    }
    addFee(e) {
        this.fees = [...new Set([...this.fees, e])]
    }
    addTags(...e) {
        this.tags = [...new Set([...this.tags, ...e])]
    }
    applyTags() {
        const e = this.fees.sort(((e, t) => e - t)).map((e => this.getTagByFee(e))),
            t = this.tags.filter((t => !e.includes(t)));
        this.downloadObject.setTags([...e, ...t])
    }
    getTagByFee(e) {
        var t;
        return null !== (t = this.feeMap.get(e)) && void 0 !== t ? t : (e > 0 ?
            `${e}円` : "無料") + "プラン"
    }
    setLimitAvailable(e) {
        this.isLimitAvailable = e
    }
    isLimitValid() {
        return !this.isLimitAvailable || this.limit > 0
    }
    decrementLimit() {
        this.isLimitAvailable && this.limit--
    }
    setLimit(e) {
        this.isLimitAvailable && (this.limit = e)
    }
}
async function r() {
    var e, t, n, o;
    let s;
    if ("https://downloads.fanbox.cc" === window.location.origin) return void await new i(
        a.utils).createDownloadUI("fanbox-downloader");
    if ("https://www.fanbox.cc" === window.location.origin) {
        const n = null === (e = window.location.href.match(/fanbox.cc\/@([^\/]*)/)) ||
            void 0 === e ? void 0 : e[1],
            o = null === (t = window.location.href.match(/fanbox.cc\/@.*\/posts\/(\d*)/)) ||
                void 0 === t ? void 0 : t[1];
        s = await l(n, o)
    } else {
        if (!window.location.href.match(/^https:\/\/(.*)\.fanbox\.cc\//)) return void alert(
            `ここどこですか(${window.location.href})`); {
            const e = null === (n = window.location.href.match(
                /^https:\/\/(.*)\.fanbox\.cc\//)) || void 0 === n ? void 0 : n[1],
                t = null === (o = window.location.href.match(/.*\.fanbox\.cc\/posts\/(\d*)/)) ||
                    void 0 === o ? void 0 : o[1];
            s = await l(e, t)
        }
    }
    if (!s) return;
    const r = s.stringify();
    console.log(r);
    const c = () => {
        alert("jsonをコピーしました。downloads.fanbox.ccで実行して貼り付けてね"), confirm(
            "downloads.fanbox.ccに遷移する？") && (document.location.href =
                "https://downloads.fanbox.cc")
    };
    try {
        await navigator.clipboard.writeText(r), c()
    } catch (e) {
        document.body.addEventListener("click", (() => {
            navigator.clipboard.writeText(r).then((() => c())).catch((() => alert(
                "jsonコピーに失敗しました。もう一度実行するかコンソールからコピーしてね")))
        }), {
            once: !0
        }), alert("jsonコピーに失敗しました。画面の適当なとこをクリック！")
    }
}
async function l(e, t) {
    var n, o;
    if (!e) return void alert("しらないURL");
    const s = a.utils.httpGetAs(
        `https://api.fanbox.cc/plan.listCreator?creatorId=${e}`).body,
        i = new Map;
    null == s || s.forEach((e => i.set(e.fee, e.title)));
    const r = new a(e, i);
    r.downloadObject.setUrl(`https://www.fanbox.cc/@${e}`);
    const l = null !== (o = null === (n = a.utils.httpGetAs(
        `https://api.fanbox.cc/tag.getFeatured?creatorId=${e}`).body) || void 0 ===
        n ? void 0 : n.map((e => e.tag))) && void 0 !== o ? o : [];
    return r.addTags(...l), t ? u(r, d(t)) : await async function (e) {
        e.isIgnoreFree = confirm("無料コンテンツを省く？");
        const t = prompt("取得制限数を入力 キャンセルで全て取得");
        if (t) {
            const n = Number.parseInt(t);
            n && (e.setLimitAvailable(!0), e.setLimit(n))
        }
        let n =
            `https://api.fanbox.cc/post.listCreator?creatorId=${e.userId}&limit=100`;
        for (let t = 1; n; t++) console.log(`${t}回目`), n = await c(e, n), await a.utils
            .sleep(10)
    }(r), r.applyTags(), r.downloadObject
}
async function c(e, t) {
    const n = a.utils.httpGetAs(t);
    console.log(`投稿の数:${n.body.items.length}`);
    for (const t of n.body.items) {
        if (!e.isLimitValid()) break;
        t.body ? u(e, t) : t.isRestricted || (await a.utils.sleep(10), u(e, d(t.id)))
    }
    return n.body.nextUrl
}

function d(e) {
    return a.utils.httpGetAs(`https://api.fanbox.cc/post.info?postId=${e}`).body
}

function u(e, t) {
    if (!t || e.isIgnoreFree && 0 === t.feeRequired) return;
    if (!t.body || t.isRestricted) return void console.log(
        `取得できませんでした(支援がたりない？)\nfeeRequired: ${t.feeRequired}@${t.id}`);
    const n = t.title,
        o = e.downloadObject.addPost(n);
    o.setTags([e.getTagByFee(t.feeRequired), ...t.tags]), e.addFee(t.feeRequired),
        e.addTags(...t.tags);
    const s = (e => {
        var t;
        if (e) {
            const s = null !== (t = e.split(".").pop()) && void 0 !== t ? t : "";
            return `${o.getImageLinkTag(o.setCover("cover", s, e))}<h5>${n}</h5>\n`
        }
        return `<h5>${n}</h5>\n<br>\n`
    })(t.coverImageUrl);
    let i;
    switch (t.type) {
        case "image":
            {
                const e = t.body.images.map((e => o.addFile(n, e.extension, e.originalUrl)))
                    .map((e => o.getImageLinkTag(e))).join("<br>\n"),
                    a = t.body.text.split("\n").map((e => `<span>${e}</span>`)).join("<br>\n");
                o.setHtml(s + e + "<br>\n" + a), i = `${t.body.text}\n`;
                break
            }
        case "file":
            {
                const e = t.body.files.map((e => o.addFile(e.name, e.extension, e.url))).map(
                    (e => o.getAutoAssignedLinkTag(e))).join("<br>\n"),
                    n = t.body.text.split("\n").map((e => `<span>${e}</span>`)).join("<br>\n");
                o.setHtml(s + e + "<br>\n" + n), i = `${t.body.text}\n`;
                break
            }
        case "article":
            {
                const e = function (e, t) {
                    const n = t.filter((e => "image" === e.type)).map((e => e.imageId)),
                        o = e => {
                            var t;
                            return null !== (t = n.indexOf(e)) && void 0 !== t ? t : n.length
                        };
                    return Object.keys(e).sort(((e, t) => o(e) - o(t))).map((t => e[t]))
                }(t.body.imageMap, t.body.blocks).map((e => o.addFile(n, e.extension, e.originalUrl))),
                    a = function (e, t) {
                        const n = t.filter((e => "file" === e.type)).map((e => e.fileId)),
                            o = e => {
                                var t;
                                return null !== (t = n.indexOf(e)) && void 0 !== t ? t : n.length
                            };
                        return Object.keys(e).sort(((e, t) => o(e) - o(t))).map((t => e[t]))
                    }(t.body.fileMap, t.body.blocks).map((e => o.addFile(e.name, e.extension,
                        e.url))),
                    r = function (e, t) {
                        const n = t.filter((e => "embed" === e.type)).map((e => e.embedId)),
                            o = e => {
                                var t;
                                return null !== (t = n.indexOf(e)) && void 0 !== t ? t : n.length
                            };
                        return Object.keys(e).sort(((e, t) => o(e) - o(t))).map((t => e[t]))
                    }(t.body.embedMap, t.body.blocks),
                    l = function (e, t) {
                        const n = t.filter((e => "url_embed" === e.type)).map((e => e.urlEmbedId)),
                            o = e => {
                                var t;
                                return null !== (t = n.indexOf(e)) && void 0 !== t ? t : n.length
                            };
                        return Object.keys(e).sort(((e, t) => o(e) - o(t))).map((t => e[t]))
                    }(t.body.urlEmbedMap, t.body.blocks);
                let c = 0,
                    d = 0,
                    u = 0,
                    h = 0;
                const p = t.body.blocks.map((t => {
                    var n;
                    switch (t.type) {
                        case "p":
                            return `<span>${t.text}</span>`;
                        case "header":
                            return `<h2><span>${t.text}</span></h2>`;
                        case "file":
                            return o.getAutoAssignedLinkTag(a[d++]);
                        case "image":
                            return o.getImageLinkTag(e[c++]);
                        case "embed":
                            return `<span>${JSON.stringify(r[u++])}</span>`;
                        case "url_embed":
                            {
                                const e = l[h++];
                                switch (e.type) {
                                    case "default":
                                        return o.getLinkTag(e.url, e.host);
                                    case "html":
                                    case "html.card":
                                        const t = null === (n = e.html.match(/<iframe.*src="(http.*)"/)) ||
                                            void 0 === n ? void 0 : n[1];
                                        return t ? o.getLinkTag(t, "iframe link") : `\n${e.html}\n\n`;
                                    case "fanbox.post":
                                        const s =
                                            `https://www.fanbox.cc/@${e.postInfo.creatorId}/posts/${e.postInfo.id}`;
                                        return o.getLinkTag(s, e.postInfo.title);
                                    default:
                                        return `<span>${JSON.stringify(e)}</span>`
                                }
                            }
                        default:
                            return console.error(`unknown block type: ${t.type}`)
                    }
                })).join("<br>\n");
                o.setHtml(s + p), i = t.body.blocks.filter((e => "p" === e.type || "header" ===
                    e.type)).map((e => e.text)).join("\n") + "\n";
                break
            }
        case "text":
            {
                const e = t.body.text.split("\n").map((e => `<span>${e}</span>`)).join(
                    "<br>\n");
                i = t.body.text, o.setHtml(s + e);
                break
            }
        default:
            i = `不明なタイプ\n${t.type}@${t.id}\n`, console.log(`不明なタイプ\n${t.type}@${t.id}`)
    }
    const r = {
        postId: t.id,
        title: t.title,
        creatorId: t.creatorId,
        fee: t.feeRequired,
        publishedDatetime: t.publishedDatetime,
        updatedDatetime: t.updatedDatetime,
        tags: t.tags,
        likeCount: t.likeCount,
        commentCount: t.commentCount
    };
    if (a.isExportJson) o.setInfo(JSON.stringify(Object.assign(Object.assign({}, r), {
        parsedText: i
    })));
    else {
        const e = Object.keys(r).map((e => `${e}:${JSON.stringify(r[e])}`)).join("\n");
        o.setInfo(e + "\nparsedText:\n" + i)
    }
    e.decrementLimit()
}
a.utils = new class {
    constructor() {
        this.audioExtension = /\.(mp3|m4a|ogg)$/, this.imageExtension =
            /\.(apng|avif|gif|jpg|jpeg|jfif|pjpeg|pjp|png|svg|webp)$/, this.videoExtension =
            /\.(mp4|webm|ogv)$/
    }
    isAudio(e) {
        return null != e.match(this.audioExtension)
    }
    isImage(e) {
        return null != e.match(this.imageExtension)
    }
    isVideo(e) {
        return null != e.match(this.videoExtension)
    }
    httpGetAs(e) {
        const t = new XMLHttpRequest;
        return t.open("GET", e, !1), t.withCredentials = !0, t.send(null), JSON.parse(
            t.responseText)
    }
    encodeFileName(e) {
        return e.replace(/\//g, "／").replace(/\\/g, "＼").replace(/,/g, "，").replace(
            /:/g, "：").replace(/\*/g, "＊").replace(/"/g, "“").replace(/</g, "＜").replace(
                />/g, "＞").replace(/\|/g, "｜").trimEnd()
    }
    encodeURI(e) {
        return this.encodeFileName(e).replaceAll(/[;,/?:@&=+$#]/g,
            encodeURIComponent)
    }
    splitExt(e) {
        return e.split(/(?=\.[^.]+$)/)
    }
    getFileName(e, t, n, o, s) {
        return n <= 1 ? `${e}${t}` : s ? `${e}_${o + 1}${t}` : `${e}_${n - o}${t}`
    }
    toQuoted(e) {
        return `'${e.replaceAll("'", "\\'")}'`
    }
    createInformationFile(e) {
        try {
            return {
                name: "info.json",
                content: [JSON.stringify(JSON.parse(e), null, "\t")]
            }
        } catch (t) {
            return {
                name: "info.txt",
                content: [e]
            }
        }
    }
    async sleep(e) {
        return new Promise((t => setTimeout(t, e)))
    }
    async fetchWithLimit({
        url: e,
        name: t
    }, n) {
        if (n < 0) return null;
        try {
            return await fetch(e).catch((e => {
                throw new Error(e)
            })).then((e => e.ok ? e.blob() : null)) || await this.fetchWithLimit({
                url: e,
                name: t
            }, n - 1)
        } catch (o) {
            return console.error(`通信エラー: ${t}, ${e}`), await this.sleep(1e3), await this
                .fetchWithLimit({
                    url: e,
                    name: t
                }, n - 1)
        }
    }
    async embedScript(e) {
        return new Promise(((t, n) => {
            let o = document.createElement("script");
            o.src = e, o.onload = () => t(o), o.onerror = e => n(e), document.head.appendChild(
                o)
        }))
    }
}, a.isExportJson = !0;
var h = t.D;
export {
    h as main
};

(()=>{
    "use strict";
    class ValveElement extends HTMLElement {
        constructor(s) {
            super(),
            this.classList.add("ValveDiagram"),
            this.valveString = "",
            this.highlightColor = ValveElement.DefaultColor
        }
        ValveElement() {
            $.empty(this);
            let s = this.i || "";
            for (let i = 0; i < this.i.length; i++) {
                let e = $.create("div", {
                    class: "ValveDiagram-valve"
                }, "" + (i + 1));
                "1" == s.charAt(i) && e.classList.add("active"),
                this.h == ValveElement.RedColor ? e.classList.add("red") : this.h == ValveElement.GreenColor && e.classList.add("green"),
                $.append(this, e)
            }
        }
        set highlightColor(t) {
            t != this.h && (this.h = t,
            this.ValveElement())
        }
        get highlightColor() {
            return this.h
        }
        set valveString(t) {
            t != this.i && (this.i = t,
            this.ValveElement())
        }
        get valveString() {
            return this.i
        }
    }
    ValveElement.DefaultColor = 0,
    ValveElement.GreenColor = 1,
    ValveElement.RedColor = 2,
    window.customElements.define("bt-valve", ValveElement);
    const valveElem = ValveElement;
    class AnswerBar extends HTMLElement {
        constructor() {
            super(),
            this.classList.add("AnswerBar"),
            this.o = new valveElem,
            this.o.highlightColor = valveElem.DefaultColor,
            this.l = this.u("", this.o),
            this.m = $.create("div", {
                class: "AnswerBar-slide-text"
            }, ["Press ", $.create("span", {
                class: "KeyCap"
            }, "1"), " - ", $.create("span", {
                class: "KeyCap"
            }, "7"), " to submit a slide position."])
        }
        u(t, s, i) {
            let e = $.create("div", {});
            return i && e.classList.add("AnswerBar-stripe-middle-flex"),
            $.append(e, s),
            $.create("div", {
                class: "AnswerBar-stripe"
            }, [$.create("div", {
                class: "AnswerBar-stripe-left"
            }, t), e, $.create("div", {
                class: "AnswerBar-stripe-right"
            })])
        }
        showAnswer(t, i) {
            function e(t) {
                return $.create("span", {
                    class: "AnswerBar-big-number"
                }, "" + t)
            }
            let h = i ? i.length : 0
              , n = []
              , r = [];
            if (h > 1) {
                _.each(t, (t=>{
                    let i = new valveElem;
                    i.valveString = t,
                    i.highlightColor = valveElem.GreenColor,
                    n.push(i)
                }
                ));
                {
                    let t = new valveElem;
                    t.valveString = i,
                    t.highlightColor = valveElem.RedColor,
                    r.push(t)
                }
                $.empty(this),
                $.append(this, [this.u("Correct answer:", n, !0), this.u("Your answer:", r, !0)])
            } else {
                n.push("Correct answer: "),
                r.push("Your answer: ");
                for (let s = 0; s < t.length; s++)
                    s > 0 && n.push(" or "),
                    n.push(e(t[s]));
                r.push(e(i)),
                $.empty(this),
                $.append(this, [this.u("", n), this.u("", r)])
            }
        }
        showValveInput(t) {
            this.o.valveString = t,
            $.empty(this),
            $.append(this, this.l)
        }
        showSlideText() {
            $.empty(this),
            $.append(this, this.m)
        }
    }
    window.customElements.define("bt-answer-bar", AnswerBar);
    const ansBar = AnswerBar;
    const HelpArea = class {
        constructor() {
            $.listen($.query("#HelpArea-hide"), "click", (t=>{
                this.g()
            }
            )),
            $.listen($.query("#HelpArea-shroud"), "click", (t=>{
                this.g()
            }
            )),
            $.listen($.query("#HelpArea-content"), "click", (t=>{
                t.stopPropagation()
            }
            ))
        }
        g() {
            $.query("#HelpArea").style.display = "none"
        }
        show() {
            $.query("#HelpArea").style.display = "block"
        }
    }
      , n = function(t, s) {
        return 12 * Math.floor(t / 7) + [0, 2, 4, 5, 7, 9, 11][t % 7] + s
    }
      , r = function(t, s) {
        return t - (s ? 29 : 41)
    }
      , a = function(t, s) {
        return t + (s ? 29 : 41)
    }
      , o = function(t) {
        let s = t.match(/([A-G])([#b])*(\d)/)
          , i = "C D EF G A B".indexOf(s[1]);
        return i < 0 ? 0 : (i += 12 * (parseInt(s[3], 10) + 1),
        "#" == s[2] ? i++ : "b" == s[2] && i--,
        i)
    }
      , l = function(t) {
        return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][t % 12] + "" + (Math.floor(t / 12) - 1)
    };
    class c {
        constructor(t) {
            this.usesBassClef = !!t.usesBassClef;
            let s = 128
              , i = 0;
            this.A = {},
            _.each(t.answers, ((t,e)=>{
                const h = o(e);
                h < s && (s = h),
                h > i && (i = h),
                this.A[h] = t
            }
            )),
            this.name = t.name,
            this.valveCount = t.valveCount,
            this.reversed = t.reversed,
            this.presets = _.map(t.presets, (t=>({
                name: t.name,
                min: o(t.min),
                max: o(t.max)
            }))),
            this.min = s,
            this.max = i
        }
        getCorrectAnswers(t) {
            let s = this.A[t];
            return _.map(_.flatten([s]), (t=>"" + t))
        }
        isAnswerCorrect(t, s) {
            return _.includes(this.getCorrectAnswers(t), s)
        }
        getStaffPosition(t) {
            return r(t, this.usesBassClef)
        }
        getDiatonicIndex(t) {
            return a(t, this.usesBassClef)
        }
    }
    c.all = [new c({
        name: "Trumpet",
        presets: [{
            name: "Beginning",
            min: "A3",
            max: "C5"
        }, {
            name: "Intermediate",
            min: "F#3",
            max: "A5"
        }, {
            name: "Advanced",
            min: "F#3",
            max: "C6"
        }],
        valveCount: 3,
        answers: {
            "F#3": "111",
            G3: "101",
            "G#3": "011",
            A3: "110",
            "A#3": "100",
            B3: "010",
            C4: "000",
            "C#4": "111",
            D4: "101",
            "D#4": "011",
            E4: "110",
            F4: "100",
            "F#4": "010",
            G4: "000",
            "G#4": "011",
            A4: "110",
            "A#4": "100",
            B4: "010",
            C5: "000",
            "C#5": "110",
            D5: "100",
            "D#5": "010",
            E5: "000",
            F5: "100",
            "F#5": "010",
            G5: "000",
            "G#5": "011",
            A5: "110",
            "A#5": "100",
            B5: "010",
            C6: "000"
        }
    }), new c({
        name: "French Horn",
        presets: [{
            name: "Beginning",
            min: "A3",
            max: "D5"
        }, {
            name: "Intermediate",
            min: "F3",
            max: "F5"
        }, {
            name: "Advanced",
            min: "E3",
            max: "C6"
        }],
        valveCount: 3,
        reversed: !0,
        answers: {
            E3: "110",
            F3: "100",
            "F#3": "010",
            G3: "000",
            "G#3": "011",
            A3: "110",
            "A#3": "100",
            B3: "010",
            C4: "000",
            "C#4": "110",
            D4: "100",
            "D#4": "010",
            E4: "000",
            F4: "100",
            "F#4": "010",
            G4: "000",
            "G#4": "011",
            A4: "110",
            "A#4": "100",
            B4: "010",
            C5: "000",
            "C#5": "010",
            D5: "000",
            "D#5": "010",
            E5: "000",
            F5: "100",
            "F#5": "010",
            G5: "000",
            "G#5": "011",
            A5: "110",
            "A#5": "100",
            B5: "010",
            C6: "000"
        }
    }), new c({
        name: "Trombone",
        presets: [{
            name: "Beginning",
            min: "A2",
            max: "A#3"
        }, {
            name: "Intermediate",
            min: "F2",
            max: "F4"
        }, {
            name: "Advanced",
            min: "E2",
            max: "A#4"
        }],
        usesBassClef: !0,
        valveCount: 0,
        answers: {
            E2: 7,
            F2: 6,
            "F#2": 5,
            G2: 4,
            "G#2": 3,
            A2: 2,
            "A#2": 1,
            B2: 7,
            C3: 6,
            "C#3": 5,
            D3: 4,
            "D#3": 3,
            E3: 2,
            F3: [1, 6],
            "F#3": 5,
            G3: 4,
            "G#3": 3,
            A3: [2, 6],
            "A#3": 1,
            B3: 4,
            C4: 3,
            "C#4": 2,
            D4: [1, 4],
            "D#4": 3,
            E4: 2,
            F4: 1
        }
    }), new c({
        name: "Euphonium",
        presets: [{
            name: "Beginning",
            min: "A2",
            max: "A#3"
        }, {
            name: "Intermediate",
            min: "F2",
            max: "F4"
        }, {
            name: "Advanced",
            min: "E2",
            max: "A#4"
        }],
        usesBassClef: !0,
        valveCount: 4,
        answers: {
            E2: "0101",
            F2: "0001",
            "F#2": "0110",
            G2: "1100",
            "G#2": "1000",
            A2: "0100",
            "A#2": "0000",
            B2: "0101",
            C3: "0001",
            "C#3": "0110",
            D3: "1100",
            "D#3": "1000",
            E3: "0100",
            F3: "0000",
            "F#3": "0110",
            G3: "1100",
            "G#3": "1000",
            A3: "0100",
            "A#3": "0000",
            B3: "1100",
            C4: "1000",
            "C#4": "0100",
            D4: "0000",
            "D#4": "1000",
            E4: "0100",
            F4: "0000",
            "F#4": "0110",
            G4: "1100",
            "G#4": "1000",
            A4: "0100",
            "A#4": "0000"
        }
    }), new c({
        name: "Tuba",
        presets: [{
            name: "Beginning",
            min: "A#1",
            max: "D3"
        }, {
            name: "Intermediate",
            min: "G1",
            max: "G3"
        }, {
            name: "Advanced",
            min: "E1",
            max: "A#3"
        }],
        usesBassClef: !0,
        valveCount: 4,
        answers: {
            E1: "111",
            F1: "101",
            "F#1": "011",
            G1: "110",
            "G#1": "100",
            A1: "010",
            "A#1": "000",
            B1: "111",
            C2: "101",
            "C#2": "011",
            D2: "110",
            "D#2": "100",
            E2: "010",
            F3: "000",
            "F#2": "011",
            G2: "110",
            "G#2": "100",
            A2: "010",
            "A#2": "000",
            B2: "110",
            C3: "100",
            "C#3": "010",
            D3: "000",
            "D#3": "100",
            E3: "010",
            F3: "000",
            "F#3": "011",
            G3: "110",
            "G#3": "100",
            A3: "010",
            "A#3": "000"
        }
    })];
    const u = c;
    class d extends HTMLElement {
        constructor(t) {
            super(),
            this.classList.add("ScoreBox"),
            this.$ = $.create("div", {
                class: "ScoreBox-score"
            }),
            this.p = $.create("div", {
                class: "ScoreBox-label"
            }, t),
            this.appendChild(this.$),
            this.appendChild(this.p)
        }
        set value(t) {
            this.C = t,
            this.$.textContent = t
        }
        get value() {
            return this.C
        }
    }
    window.customElements.define("score-box", d);
    const m = d;
    const g = class {
        constructor() {
            this.dismissCallback = null,
            this.F = $.query("#SettingsArea"),
            this.B = $.query("#SettingsInstrument"),
            this.v = $.query("#SettingsRangePreset"),
            this.S = $.query("#SettingsLowRangeInput"),
            this.D = $.query("#SettingsHighRangeInput"),
            this.G = $.query("#SettingsLowRangeLabel"),
            this._ = $.query("#SettingsHighRangeLabel"),
            this.I = $.query("#SettingsAllowSharps"),
            this.N = $.query("#SettingsAllowBsEs"),
            this.k = $.query("#SettingsAllowFlats"),
            this.L = $.query("#SettingsAllowCbFb"),
            this.H = $.query("#SettingsRemember"),
            $.listen(this.B, "change", (t=>{
                this.T(t)
            }
            )),
            $.listen(this.v, "change", (t=>{
                this.M(t)
            }
            )),
            $.listen(this.S, "input", (t=>{
                this.R(t)
            }
            )),
            $.listen(this.D, "input", (t=>{
                this.R(t)
            }
            )),
            $.listen($.query("#SettingsArea-shroud"), "click", (t=>{
                this.g()
            }
            )),
            $.listen($.query("#SettingsArea-hide"), "click", (t=>{
                this.g()
            }
            )),
            $.listen($.query("#SettingsArea-content"), "click", (t=>{
                t.stopPropagation()
            }
            ));
            let t = 0;
            _.each(u.all, (s=>{
                $.append(this.B, $.create("option", {
                    value: t
                }, s.name)),
                t++
            }
            )),
            this.B.value = 0,
            this.I.checked = !0,
            this.k.checked = !0,
            this.T()
        }
        g() {
            this.F.style.display = "none",
            this.dismissCallback && this.dismissCallback()
        }
        P(t, s) {
            let i = this.K()
              , e = parseInt(t.value, 10)
              , h = e;
            h < i.min && (h = i.min),
            h > i.max && (h = i.max),
            e != h && (t.value = h),
            s.textContent = l(h)
        }
        K() {
            let t = parseInt(this.B.value, 10);
            return u.all[t]
        }
        V() {
            let t = parseInt(this.v.value, 10);
            return this.K().presets[t]
        }
        T(t) {
            let s = this.K()
              , i = this.v
              , e = this.S
              , h = this.D;
            $.empty(i);
            let n = 0;
            _.each(s.presets, (t=>{
                $.append(i, $.create("option", {
                    value: n
                }, t.name)),
                n++
            }
            )),
            $.append(i, $.create("option", {
                value: "-1"
            }, "Custom")),
            e.min = h.min = s.min,
            e.max = h.max = s.max,
            this.M(t)
        }
        M(t) {
            let s = this.V()
              , i = this.S
              , e = this.D;
            s && (i.value = s.min,
            e.value = s.max),
            this.R(t)
        }
        R(t) {
            let s = this.v
              , i = this.S
              , e = this.D
              , h = this.G
              , n = this._;
            this.P(i, h),
            this.P(e, n);
            let r = this.V();
            r && (i.value == r.min && e.value == r.max || (s.value = -1)),
            t && t.stopPropagation()
        }
        show(t) {
            this.F.style.display = "block",
            this.O = t
        }
        set settings(t) {
            this.B.value = t.instrumentIndex,
            this.T(),
            this.v.value = t.presetIndex,
            this.M(),
            this.S.value = t.rangeMin,
            this.D.value = t.rangeMax,
            this.R(),
            this.I.checked = t.allowSharps,
            this.N.checked = t.allowBsEs,
            this.k.checked = t.allowFlats,
            this.L.checked = t.allowCbFb,
            this.H.checked = t.remember
        }
        get settings() {
            let t = this.K()
              , s = parseInt(this.S.value, 10)
              , i = parseInt(this.D.value, 10);
            if (i < s) {
                let t = s;
                s = i,
                i = t
            }
            return {
                instrumentIndex: u.all.indexOf(t),
                presetIndex: parseInt(this.v.value, 10),
                rangeMin: s,
                rangeMax: i,
                allowSharps: this.I.checked,
                allowBsEs: this.N.checked,
                allowFlats: this.k.checked,
                allowCbFb: this.L.checked,
                remember: this.H.checked
            }
        }
    }
    ;
    const w = class {
        constructor(t) {
            this.U = t,
            this.J = 0,
            this.Y = 0,
            this.j = !1,
            $.listen(t, "load", (()=>{
                this.t()
            }
            ))
        }
        t() {
            let t = this.U.contentDocument;
            if (!t)
                return;
            if (!t.getElementById)
                return;
            function s(s) {
                return t.getElementById(s)
            }
            function i(t, s, i) {
                t.setAttribute("transform", "translate(" + s + "," + i + ")")
            }
            function e(t, s) {
                t.style.visibility = s ? "visible" : "hidden"
            }
            this.U && this.U.classList.remove("hidden");
            const h = s("Flat")
              , n = s("Sharp")
              , r = s("UpNote")
              , a = s("DownNote");
            if (!(h && n && r && a))
                return;
            const o = this.J
              , l = this.Y
              , c = this.j;
            e(s("TrebleClef"), !c),
            e(s("BassClef"), c),
            e(h, l < 0),
            e(n, l > 0),
            e(r, o < 0),
            e(a, o >= 0),
            e(s("TopLedger1"), o >= 6),
            e(s("TopLedger2"), o >= 8),
            e(s("TopLedger3"), o >= 10),
            e(s("TopLedger4"), o >= 12),
            e(s("BottomLedger1"), o <= -6),
            e(s("BottomLedger2"), o <= -8),
            e(s("BottomLedger3"), o <= -10),
            e(s("BottomLedger4"), o <= -12);
            let u = -20 * o
              , d = o % 2 ? -2 : 0;
            i(a, 326, 270 + u),
            i(r, 326, 150 + u),
            i(h, 264, 210 + u + d),
            i(n, 261, 230 + u)
        }
        set position(t) {
            this.J = t,
            this.t()
        }
        get position() {
            return this.J
        }
        set accidental(t) {
            this.Y = t,
            this.t()
        }
        get accidental() {
            return this.Y
        }
        set usesBassClef(t) {
            this.j = t,
            this.t()
        }
        get usesBassClef() {
            return this.j
        }
    }
    ;
    class A {
        constructor() {
            this.q = null,
            this.W = null,
            this.X = 0,
            this.Z = 0,
            this.tt = 0,
            this.st = 0,
            this.it = !1,
            this.et = 0,
            this.ht = {},
            this.nt = new w($.query("#StaffObject")),
            this.rt = new HelpArea,
            this.at = new g,
            this.ot = new m("Correct"),
            this.lt = new m("Incorrect"),
            this.ct = new m("Percent"),
            this.ut = $.create("button", {}, "New Note"),
            this.dt = $.create("button", {}, "Show Settings"),
            this.gt = $.create("button", {}, "Show Help"),
            this.wt = $.create("button", {}, "Reset Score"),
            $.listen(window, "keydown", (t=>this.At(t))),
            $.listen(window, "keyup", (t=>this.$t(t))),
            $.listen(this.ut, "click", (t=>{
                this.Ct()
            }
            )),
            $.listen(this.dt, "click", (t=>{
                this.at.show()
            }
            )),
            $.listen(this.gt, "click", (t=>{
                this.rt.show()
            }
            )),
            $.listen(this.wt, "click", (t=>{
                this.ft()
            }
            )),
            this.at.dismissCallback = ()=>{
                this.Ft()
            }
            ,
            this.Bt = $.query("#BottomArea"),
            $.append($.query("#ScoreArea"), [this.ot, this.lt, this.ct]),
            $.append($.query("#ControlsArea"), [this.ut, this.dt, this.gt, this.wt]),
            this.vt = new ansBar,
            $.append($.query("#QuestionArea"), this.vt),
            this.St = null,
            this.Dt = [];
            {
                let t = null;
                try {
                    t = window.localStorage.getItem("settings"),
                    t && (t = JSON.parse(t))
                } catch (t) {}
                t && t.remember && (this.at.settings = t)
            }
            this.Ft();
            let t = $.query("#AppArea");
            t && t.classList.remove("hidden")
        }
        At(t) {
            let s = t.code;
            this.ht[s] = !0,
            this.St && !this.it && ("KeyN" == s && window.event.shiftKey ? this.Ct() : this.St.valveCount > 1 ? (this.Gt(),
            "Space" != s && "Enter" != s && "NumpadEnter" != s && "NumpadDecimal" != s || this._t()) : (this.W = {
                Digit1: "1",
                Numpad1: "1",
                Digit2: "2",
                Numpad2: "2",
                Digit3: "3",
                Numpad3: "3",
                Digit4: "4",
                Numpad4: "4",
                Digit5: "5",
                Numpad5: "5",
                Digit6: "6",
                Numpad6: "6",
                Digit7: "7",
                Numpad7: "7"
            }[t.code],
            this.W && this._t()))
        }
        $t(t) {
            let s = t.code;
            this.ht[s] = !1,
            this.St && this.St.valveCount > 1 && this.Gt()
        }
        xt() {
            this.it || (this.it = !0,
            this.et = window.setTimeout((()=>{
                this.bt(),
                this.Ct()
            }
            ), 2e3))
        }
        bt() {
            this.it && (window.clearTimeout(this.et),
            this.et = 0,
            this.it = !1)
        }
        Et() {
            let t = this.X
              , s = t + this.Z
              , i = Math.round(s > 0 ? t / s : 0);
            this.ot.value = this.X,
            this.lt.value = this.Z,
            this.ct.value = i
        }
        It() {
            this.q && (this.nt.usesBassClef = this.St.usesBassClef,
            this.nt.position = this.q.position,
            this.nt.accidental = this.q.quality)
        }
        Gt() {
            if (!this.St || this.it)
                return;
            let t = this.St.valveCount;
            if (t > 1) {
                let s = this.ht
                  , i = [!!(s.ArrowLeft || s.Digit1 || s.KeyZ || s.KeyA || s.KeyQ), !!(s.ArrowDown || s.Digit2 || s.KeyX || s.KeyS || s.KeyW), !!(s.ArrowRight || s.Digit3 || s.KeyC || s.KeyD || s.KeyE), !!(s.Numpad0 || s.Digit4 || s.KeyV || s.KeyF || s.KeyR)];
                i.length > t && (i = i.slice(0, t)),
                this.St.reversed && i.reverse(),
                this.W = _.map(i, (t=>t ? "1" : "0")).join(""),
                this.vt.showValveInput(this.W)
            } else
                this.vt.showSlideText()
        }
        t() {
            this.Et(),
            this.It(),
            this.Gt()
        }
        Ft() {
            let t = this.at.settings;
            if (_.isEqual(t, this.Nt))
                return;
            let s = u.all[t.instrumentIndex]
              , i = [];
            for (let e = -10; e <= 10; e++)
                for (let h = -1; h <= 1; h++) {
                    let r = s.getDiatonicIndex(e)
                      , a = r % 7
                      , o = n(r, h);
                    if (!(o < t.rangeMin || o > t.rangeMax)) {
                        if (-1 == h) {
                            if (!t.allowFlats)
                                continue;
                            if (!t.allowCbFb && (0 == a || 3 == a))
                                continue
                        }
                        if (1 == h) {
                            if (!t.allowSharps)
                                continue;
                            if (!t.allowBsEs && (6 == a || 2 == a))
                                continue
                        }
                        i.push({
                            diatonicIndex: r,
                            position: e,
                            quality: h,
                            MIDIValue: o
                        })
                    }
                }
            if (this.St = s,
            this.Dt = i,
            this.Nt = t,
            t.remember)
                try {
                    window.localStorage.setItem("settings", JSON.stringify(t))
                } catch (t) {}
            this.Ct()
        }
        _t() {
            let t = this.St
              , s = this.q.MIDIValue;
            if (t.isAnswerCorrect(s, this.W))
                this.X++,
                this.Ct();
            else {
                this.Z++;
                let i = t.getCorrectAnswers(s);
                this.vt.showAnswer(i, this.W),
                this.xt()
            }
            this.t()
        }
        Ct() {
            let t = 0;
            for (this.bt(); t < 1e3; ) {
                t++;
                let s = Math.floor(Math.random() * this.Dt.length)
                  , i = this.Dt[s];
                this.q && this.q.position == i.position || (this.q = i)
            }
            this.t()
        }
        ft() {
            this.X = 0,
            this.Z = 0,
            this.t()
        }
    }
    $.ready((()=>{
        new A
    }
    ))
}
)();

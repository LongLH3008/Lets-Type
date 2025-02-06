const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const wordList = [
    "h@ppy", "c@t!", "d0g$", "b@ll", "f!sh", "b!rd", "c0w%", "f0x^", "l!0n", "t!ger",
    "zebr@", "m0nkey", "el3phant", "g!raffe", "k@ngaroo", "p@nda", "p!g!", "c0w!", "h0rse", "d0nkey",
    "c@mel", "g0at", "sheep!", "ch!ck3n", "d0g@", "c@t#", "b!rd%", "f!sh^", "l!0n&", "t!ger*",
    "zebr@(", "m0nkey)", "el3phant_", "g!raffe+", "k@ngaroo=", "p@nda[", "p!g!]", "c0w!{", "h0rse}", "d0nkey|",
    "c@mel\\", "g0at/", "sheep!", "ch!ck3n?", "d0g@~", "c@t#`", "b!rd%1", "f!sh^2", "l!0n&3", "t!ger*4",
    "zebr@(5", "m0nkey)6", "el3phant_7", "g!raffe+8", "k@ngaroo=9", "p@nda[0", "p!g!]q", "c0w!{w", "h0rse}e", "d0nkey|r",
    "c@mel\\t", "g0at/y", "sheep!u", "ch!ck3n?i", "d0g@~o", "c@t#`p", "b!rd%1a", "f!sh^2s", "l!0n&3d", "t!ger*4f",
    "zebr@(5g", "m0nkey)6h", "el3phant_7j", "g!raffe+8k", "k@ngaroo=9l", "p@nda[0z", "p!g!]qx", "c0w!{wc", "h0rse}ev", "d0nkey|rb",
    "c@mel\\tn", "g0at/ym", "sheep!ui", "ch!ck3n?io", "d0g@~op", "c@t#`pa", "b!rd%1as", "f!sh^2sd", "l!0n&3df", "t!ger*4fg",
    "zebr@(5gh", "m0nkey)6hj", "el3phant_7jk", "g!raffe+8kl", "k@ngaroo=9lz", "p@nda[0zx", "p!g!]qxc", "c0w!{wcv", "h0rse}evb", "d0nkey|rbn",
    "c@mel\\tnm", "g0at/ymn", "sheep!uio", "ch!ck3n?iop", "d0g@~opa", "c@t#`pas", "b!rd%1asd", "f!sh^2sdf", "l!0n&3dfg", "t!ger*4fgh",
    "zebr@(5ghj", "m0nkey)6hjk", "el3phant_7jkl", "g!raffe+8klz", "k@ngaroo=9lzx", "p@nda[0zxc", "p!g!]qxcv", "c0w!{wcvb", "h0rse}evbn", "d0nkey|rbnm",
    "c@mel\\tnmn", "g0at/ymnm", "sheep!uiop", "ch!ck3n?iopa", "d0g@~opas", "c@t#`pasd", "b!rd%1asdf", "f!sh^2sdfg", "l!0n&3dfgh", "t!ger*4fghj",
    "zebr@(5ghjk", "m0nkey)6hjkl", "el3phant_7jklz", "g!raffe+8klzx", "k@ngaroo=9lzxc", "p@nda[0zxcv", "p!g!]qxcvb", "c0w!{wcvbn", "h0rse}evbnm", "d0nkey|rbnmn",
    "c@mel\\tnmnm", "g0at/ymnmm", "sheep!uiopa", "ch!ck3n?iopas", "d0g@~opasd", "c@t#`pasdf", "b!rd%1asdfg", "f!sh^2sdfgh", "l!0n&3dfghj", "t!ger*4fghjk",
    "zebr@(5ghjkl", "m0nkey)6hjklz", "el3phant_7jklzx", "g!raffe+8klzxc", "k@ngaroo=9lzxcv", "p@nda[0zxcvb", "p!g!]qxcvbn", "c0w!{wcvbnm", "h0rse}evbnmn", "d0nkey|rbnmnm",
    "c@mel\\tnmnmn", "g0at/ymnmmm", "sheep!uiopas", "ch!ck3n?iopasd", "d0g@~opasdf", "c@t#`pasdfg", "b!rd%1asdfgh", "f!sh^2sdfghj", "l!0n&3dfghjk", "t!ger*4fghjkl",
    "zebr@(5ghjklz", "m0nkey)6hjklzx", "el3phant_7jklzxc", "g!raffe+8klzxcv", "k@ngaroo=9lzxcvb", "p@nda[0zxcvbn", "p!g!]qxcvbnm", "c0w!{wcvbnmn", "h0rse}evbnmnm", "d0nkey|rbnmnmn",
    "c@mel\\tnmnmnm", "g0at/ymnmmmm", "sheep!uiopasd", "ch!ck3n?iopasdf", "d0g@~opasdfg", "c@t#`pasdfgh", "b!rd%1asdfghj", "f!sh^2sdfghjk", "l!0n&3dfghjkl", "t!ger*4fghjklz",
    "zebr@(5ghjklzx", "m0nkey)6hjklzxc", "el3phant_7jklzxcv", "g!raffe+8klzxcvb", "k@ngaroo=9lzxcvbn", "p@nda[0zxcvbnm", "p!g!]qxcvbnmn", "c0w!{wcvbnmnm", "h0rse}evbnmnmn", "d0nkey|rbnmnmnm",
    "c@mel\\tnmnmnmn", "g0at/ymnmmmmm", "sheep!uiopasdf", "ch!ck3n?iopasdfg", "d0g@~opasdfgh", "c@t#`pasdfghj", "b!rd%1asdfghjk", "f!sh^2sdfghjkl", "l!0n&3dfghjklz", "t!ger*4fghjklzx",
    "zebr@(5ghjklzxc", "m0nkey)6hjklzxcv", "el3phant_7jklzxcvb", "g!raffe+8klzxcvbn", "k@ngaroo=9lzxcvbnm", "p@nda[0zxcvbnmn", "p!g!]qxcvbnmnm", "c0w!{wcvbnmnmn", "h0rse}evbnmnmnm", "d0nkey|rbnmnmnmn",
    "c@mel\\tnmnmnmnm", "g0at/ymnmmmmmm", "sheep!uiopasdfg", "ch!ck3n?iopasdfgh", "d0g@~opasdfghj", "c@t#`pasdfghjk", "b!rd%1asdfghjkl", "f!sh^2sdfghjklz", "l!0n&3dfghjklzx", "t!ger*4fghjklzxc",
    "zebr@(5ghjklzxcv", "m0nkey)6hjklzxcvb", "el3phant_7jklzxcvbn", "g!raffe+8klzxcvbnm", "k@ngaroo=9lzxcvbnmn", "p@nda[0zxcvbnmnm", "p!g!]qxcvbnmnmn", "c0w!{wcvbnmnmnm", "h0rse}evbnmnmnmn", "d0nkey|rbnmnmnmnm",
    "c@mel\\tnmnmnmnmn", "g0at/ymnmmmmmmm", "sheep!uiopasdfgh", "ch!ck3n?iopasdfghj", "d0g@~opasdfghjk", "c@t#`pasdfghjkl", "b!rd%1asdfghjklz", "f!sh^2sdfghjklzx", "l!0n&3dfghjklzxc", "t!ger*4fghjklzxcv",
    "zebr@(5ghjklzxcvb", "m0nkey)6hjklzxcvbn", "el3phant_7jklzxcvbnm", "g!raffe+8klzxcvbnmn", "k@ngaroo=9lzxcvbnmnm", "p@nda[0zxcvbnmnmn", "p!g!]qxcvbnmnmnm", "c0w!{wcvbnmnmnmn", "h0rse}evbnmnmnmnm", "d0nkey|rbnmnmnmnmn",
    "c@mel\\tnmnmnmnmnm", "g0at/ymnmmmmmmmm", "sheep!uiopasdfghj", "ch!ck3n?iopasdfghjk", "d0g@~opasdfghjkl", "c@t#`pasdfghjklz", "b!rd%1asdfghjklzx", "f!sh^2sdfghjklzxc", "l!0n&3dfghjklzxcv", "t!ger*4fghjklzxcvb",
    "zebr@(5ghjklzxcvbn", "m0nkey)6hjklzxcvbnm", "el3phant_7jklzxcvbnmn", "g!raffe+8klzxcvbnmnm", "k@ngaroo=9lzxcvbnmnmn", "p@nda[0zxcvbnmnmnm", "p!g!]qxcvbnmnmnmn", "c0w!{wcvbnmnmnmnm", "h0rse}evbnmnmnmnmn", "d0nkey|rbnmnmnmnmnm",
    "c@mel\\tnmnmnmnmnmn", "g0at/ymnmmmmmmmmm", "sheep!uiopasdfghjk", "ch!ck3n?iopasdfghjkl", "d0g@~opasdfghjklz", "c@t#`pasdfghjklzx", "b!rd%1asdfghjklzxc", "f!sh^2sdfghjklzxcv", "l!0n&3dfghjklzxcvb", "t!ger*4fghjklzxcvbn",
    "zebr@(5ghjklzxcvbnm", "m0nkey)6hjklzxcvbnmn", "el3phant_7jklzxcvbnmnm", "g!raffe+8klzxcvbnmnmn", "k@ngaroo=9lzxcvbnmnmnm", "p@nda[0zxcvbnmnmnmn", "p!g!]qxcvbnmnmnmnm", "c0w!{wcvbnmnmnmnmn", "h0rse}evbnmnmnmnmnm", "d0nkey|rbnmnmnmnmnmn",
    "c@mel\\tnmnmnmnmnmnm", "g0at/ymnmmmmmmmmmm", "sheep!uiopasdfghjkl", "ch!ck3n?iopasdfghjklz", "d0g@~opasdfghjklzx", "c@t#`pasdfghjklzxc", "b!rd%1asdfghjklzxcv", "f!sh^2sdfghjklzxcvb", "l!0n&3dfghjklzxcvbn", "t!ger*4fghjklzxcvbnm",
    "zebr@(5ghjklzxcvbnmn", "m0nkey)6hjklzxcvbnmnm", "el3phant_7jklzxcvbnmnmn", "g!raffe+8klzxcvbnmnmnm", "k@ngaroo=9lzxcvbnmnmnmn", "p@nda[0zxcvbnmnmnmnm", "p!g!]qxcvbnmnmnmnmn", "c0w!{wcvbnmnmnmnmnm", "h0rse}evbnmnmnmnmnmn", "d0nkey|rbnmnmnmnmnmnm",
    "c@mel\\tnmnmnmnmnmnmn", "g0at/ymnmmmmmmmmmmm", "sheep!uiopasdfghjklz", "ch!ck3n?iopasdfghjklzx", "d0g@~opasdfghjklzxc", "c@t#`pasdfghjklzxcv", "b!rd%1asdfghjklzxcvb", "f!sh^2sdfghjklzxcvbn", "l!0n&3dfghjklzxcvbnm", "t!ger*4fghjklzxcvbnmn",
    "zebr@(5ghjklzxcvbnmnm", "m0nkey)6hjklzxcvbnmnmn", "el3phant_7jklzxcvbnmnmnm", "g!raffe+8klzxcvbnmnmnmn", "k@ngaroo=9lzxcvbnmnmnmnm", "p@nda[0zxcvbnmnmnmnmn", "p!g!]qxcvbnmnmnmnmnm", "c0w!{wcvbnmnmnmnmnmn", "h0rse}evbnmnmnmnmnmnm", "d0nkey|rbnmnmnmnmnmnmn",
    "c@mel\\tnmnmnmnmnmnmnm", "g0at/ymnmmmmmmmmmmmm", "sheep!uiopasdfghjklzx", "ch!ck3n?iopasdfghjklzxc", "d0g@~opasdfghjklzxcv", "c@t#`pasdfghjklzxcvb", "b!rd%1asdfghjklzxcvbn", "f!sh^2sdfghjklzxcvbnm", "l!0n&3dfghjklzxcvbnmn", "t!ger*4fghjklzxcvbnmnm",
    "zebr@(5ghjklzxcvbnmnmn", "m0nkey)6hjklzxcvbnmnmnm", "el3phant_7jklzxcvbnmnmnmn", "g!raffe+8klzxcvbnmnmnmnm", "k@ngaroo=9lzxcvbnmnmnmnmn", "p@nda[0zxcvbnmnmnmnmnm", "p!g!]qxcvbnmnmnmnmnmn", "c0w!{wcvbnmnmnmnmnmnm", "h0rse}evbnmnmnmnmnmnmn", "d0nkey|rbnmnmnmnmnmnmnm",
    "c@mel\\tnmnmnmnmnmnmnmn", "g0at/ymnmmmmmmmmmmmmm", "sheep!uiopasdfghjklzxc", "ch!ck3n?iopasdfghjklzxcv", "d0g@~opasdfghjklzxcvb", "c@t#`pasdfghjklzxcvbn",
    "co@de", "re$ume", "pa#ssword", "u!nique", "f%ree", "ti^tle", "e&mail",
    "se*cret", "mo(dify", "de)sign", "up+date", "ver-sion", "com=plete",
    "im/prove", "fea|ture", "sys.tem", "sta:tus", "pu;blish", "res?et",
    "in'put", "fi\"eld", "in`clude", "op{tion", "ex}ample", "fu[nction",
    "cl]ass", "lo<gin", "si>gnup", "ad,just", "con.fig", "per.cent",
    "spe\\cial", "di/vider", "for&mat", "ad#min", "co^nnect", "encr!ypt",
    "sy!nchronize", "cu$stom", "high@light", "depen$dency", "vali&date",
    "inte*rface", "pri(mary", "ex)tract", "ac+tion", "de-bug", "ren=der",
    "re/lease", "fil|ter", "edit.or", "var:iable", "or;ganize", "tes?ting",
    "str'ucture", "set\"tings", "ver`ify", "con{fig", "re}port", "up[load",
    "do]wnload", "res<ponse", "co>nsole", "im,plement", "sta.tement",
    "re\\source", "en/force", "ob&ject", "ge#nerate", "ca^tegory",
    "sim!ulate", "con$tract", "co@mpare", "ini^tialize", "re!solve",
    "docu$ment", "op@erate", "ca&librate", "syn*tax", "de(limiter",
    "in)sert", "up+grade", "in-terrupt", "re=store", "pre/load", "op|timize",
    "tex:ture", "char;acter", "qu?ery", "data'base", "net\"work", "serv`er",
    "log{in", "co}nnect", "op[tional", "de]lete", "rep<lace", "per>mission",
    "ex,port", "sy.ntax", "sta\\ble", "com/press", "exp&and", "temp#late",
    "re^duce", "tran!sform", "st$orage", "in@dex", "ini^tiate", "mo!dule",
    "op$eration", "fu@nctional", "st^atement", "un!lock", "sys$tematic",
    "retr@ieve", "h@ndler", "exp@ndable", "dyn@mic", "cont$rol", "metho%d",
    "sta!ck", "ser^vice", "com!pile", "oper@ational", "env@ironment",
    "res$ourceful", "inv@lid", "requ@est", "serv@able", "reli@ble", "updat$able",
    "conf@gurable", "optimi%zation", "def$ault", "attr@ibute", "encrypt@ed",
    "tran$saction", "conn@ected", "sys@tematic", "reli@bility", "proc@essing",
    "allo@cation", "impl@ementation", "integr@ation", "authentic@ted", "pre@view",
    "softw@are", "comp@atibility", "erro@r-free", "a$ccessibility", "customiz@able",
    "debu@gging", "cod@ing", "ad@ministrator", "reque@stable", "config@ured",
    "encrypt@ion", "devel@opment", "auth@orization", "verifi@able", "cach@able",
    "int@egrity", "prod@uction", "flex@ible", "versi@on", "opti@mization",
    "spec@ification", "secur@ity", "man@agement", "conne@ctivity", "synchron@ization",
    "customiz@ation", "serv@erless", "backend@engine", "front@end", "inte@raction",
    "extens@ion", "perfor@mance", "dynam@ic-render", "respon@siveness",
    "deploy@ment", "compat@ibility", "system@atic-check", "routin@g",
    "troublesh@ooting", "author@ized-access", "par@sing", "logg@ing",
    "referen@ce-table", "infrastr@ucture", "stor@age-unit", "dat@a-point",
    "analyt@ics", "load-bal@ancing", "synt@ax-error", "process@ing-power",
    "inclus@ivity", "config@uration", "script@ing", "fetch@ing-data",
    "back@tracking", "repl@ication", "compil@ation", "executable@file",
    "serializ@ation", "authentic@ation-token", "crypt@ographic",
    "compress@ion-algorithm", "decompress@ion", "asynchron@ous-task",
    "test@ability", "modul@ar-design", "deploy@able-unit", "distribut@ed-network",
    "queue@m", "alg@orithm", "thread@pool", "callback@handler", "pro@tocol",
    "transm@ission", "in@jection", "firew@all", "verifi@cation-process",
    "encrypt@ed-storage", "priv@ate-key", "publ@ic-key", "de@cryption",
    "h@shing-algorithm", "compress@ed-data", "format@ted-output",
    "acc@ess-log", "database@table", "query@optimization", "error@handling",
    "app@lication-layer", "network@layer", "pack@et-filtering",
    "reli@ability-check", "stream@ing-service", "real-time@monitoring",
    "failover@strategy", "back@up-policy", "high-avail@ability",
    "transp@ort-layer", "c@che-management", "auth@orization-protocol",
    "cross-plat@form", "execut@ion-time", "debug@ging-tool",
    "extens@ibility", "thread@safe", "datab@ase-schema", "lat@ency-check",
    "load@testing", "fail@safe", "sys@log", "applic@ation-log",
    "secur@e-storage", "transp@arency", "per@mission-set", "log@in-session",
    "us@er-role", "framework@update", "version@control", "config@uration-file",
    "depen@dency-injection", "integr@ity-check", "h@shing-function",
    "comp@ression-rate", "decomp@ression-speed", "server@log",
]

const replaceSpecialCharacters = (input: any) => {
    return input.toString().replaceAll("...", "_3dots").replaceAll(",", "_comma");
};

// Tạo 100 dòng dữ liệu
const data = [];
for (let i = 0; i < wordList.length; i++) {
    const content = replaceSpecialCharacters(wordList[i].toLowerCase());
    const difficult = content.length > 9 ? 'super_hard' : content.length > 8 ? 'hard' : content.length > 4 ? 'medium' : 'easy'
    let temp = [
        1511 + 1, // id để trống
        new Date().toLocaleString("en-US", { timeZoneName: "short" }).split(",").join(" "), // created_at
        0, // used
        content, // content
        'super_hard', // difficult
        "9390cb38-dc9b-48de-9f98-c552c328a521", // author
        "public", // available
        "active", // active
        "", // updated_at để trống
    ].join(",");

    data.push(temp);
}

console.log(data);

// Ghi vào file CSV
const csvContent = "id,created_at,used,content,difficult,author,available,active,updated_at\n" + data.join("\n");
fs.writeFileSync("words_data.csv", csvContent, "utf8");

console.log("File CSV đã được tạo: words_data.csv");

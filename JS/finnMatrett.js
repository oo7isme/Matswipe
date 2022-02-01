let matretter = '{"matretter":['+
    '{"navn":"Salat", "desc":"Salat ting tang", "link":"https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/mzlmpwxtggxjgnaakzzi/salat-med-jordbaer-og-melon"},'+
    '{"navn":"Pølser", "desc":"Pølse ting tang", "link":"https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1328/k8lf2x5ruduskjrnufnu/topp-polsa-med-noe-digg"},'+
    '{"navn":"Pizza", "desc":"Pizza ting tang", "link":"https://res.cloudinary.com/norgesgruppen/images/c_scale,dpr_auto,f_auto,q_auto:eco,w_1600/ymxoheqkwzcc0fjvsy4h/pizza-med-salsiccia"},'+
    '{"navn":"Taco", "desc":"Taco ting tang", "link":"https://res.cloudinary.com/norgesgruppen/image/upload/c_fill,f_auto,h_439,q_auto,w_780/qwdymnjp7eocpsnsbr0o.png"} ]}';

const obj = JSON.parse(matretter);

var index = Math.random() * 3
document.getElementById("navn").innerHTML = obj.matretter[parseInt(index)].navn;
document.getElementById("desc").innerHTML = obj.matretter[parseInt(index)].desc;
var bildelink = obj.matretter[parseInt(index)].link;
document.getElementById("bg").style.backgroundImage = 'url('+bildelink+')';
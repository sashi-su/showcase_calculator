// プログラム全体を通して、キャラクターの基礎HP、基礎攻撃力、天賦倍率は
// https://genshin-impact.fandom.com/wiki の各キャラクターのページに記載された数値を引用した
// 胡桃の基礎攻撃力と護摩の杖の基礎攻撃力の和の厳密な値は不明のため、ゲーム内で確認できる数値715でそのまま計算する
// プログラム全体を通して、画面には適切に丸めた数値を表示するが、プログラム上では丸めずfloat型の数値を計算するように意識した


// 画面を下にスクロールしてもダメージを上に表示したままにする
document.addEventListener("scroll", function() {
    var main_element = document.getElementById("main");
    var damage_element = document.getElementById("damage-showcase");

    if (damage_element.getBoundingClientRect().top < 0) {
        damage_element.style.position = "fixed";
        main_element.style.paddingTop = "117.6px";
    }

    if (main_element.getBoundingClientRect().top > -20) {
        damage_element.style.position = "static";
        main_element.style.paddingTop = "20px";
    }
});


// タブを開く関数（GPT-4o 作）
function showScreen1(screenId) {
    var screens = document.getElementsByClassName('screen1');
    for (var i = 0; i < screens.length; i++) {
        screens[i].style.display = 'none';
    }
    document.getElementById(screenId).style.display = 'block';
}

function showScreen2(screenId) {
    var screens = document.getElementsByClassName('screen2');
    for (var i = 0; i < screens.length; i++) {
        screens[i].style.display = 'none';
    }
    document.getElementById(screenId).style.display = 'block';
}


// 編成していないキャラクターの編集画面で注意を促したり、5人以上編成しているときに注意を促す関数（脳筋実装）
function team_caution() {
    let member_number = 1;
    if (document.getElementById("kazuha_team").checked) {
        document.getElementById("kazuha_team_caution").style.display = "none";
        member_number += 1;
    } else {
        document.getElementById("kazuha_team_caution").style.display = "inline";
    }

    if (document.getElementById("xilonen_team").checked) {
        document.getElementById("xilonen_team_caution").style.display = "none";
        member_number += 1;
    } else {
        document.getElementById("xilonen_team_caution").style.display = "inline";
    }

    if (document.getElementById("bennett_team").checked) {
        document.getElementById("bennett_team_caution").style.display = "none";
        member_number += 1;
    } else {
        document.getElementById("bennett_team_caution").style.display = "inline";
    }

    if (document.getElementById("furina_team").checked) {
        document.getElementById("furina_team_caution").style.display = "none";
        member_number += 1;
    } else {
        document.getElementById("furina_team_caution").style.display = "inline";
    }

    if (document.getElementById("ayaka_team").checked) {
        document.getElementById("ayaka_team_caution").style.display = "none";
        member_number += 1;
    } else {
        document.getElementById("ayaka_team_caution").style.display = "inline";
    }

    if (document.getElementById("citlali_team").checked) {
        document.getElementById("citlali_team_caution").style.display = "none";
        member_number += 1;
    } else {
        document.getElementById("citlali_team_caution").style.display = "inline";
    }

    if (member_number <= 4) {
        document.getElementById("member_number_caution").style.display = "none";
        document.getElementById("member_number_caution_view").style.display = "none";
    } else {
        document.getElementById("member_number_caution").style.display = "inline";
        document.getElementById("member_number_caution_view").style.display = "inline";
    }
}
team_caution();


// 敵レベルと敵の元素耐性を入力させる関数
// ついでに螺旋でのバフ入力のヒントや料理の非表示も行う
function set_enemy_level() {
    var level_range1 = document.getElementById("level_range1")
    var level_range2 = document.getElementById("level_range2");
    var level_input = document.getElementById("level_input");
    var enemy_level = document.getElementById("enemy_level");

    var enemy_resistance = document.getElementById("enemy_resistance");
    var resistance_input = document.getElementById("resistance_input");
    var curse_stacks_span = document.getElementById("curse_stacks_span");

    var abyss_tip = document.getElementById("abyss_tip");
    var foods_select = document.getElementById("foods_select");

    if (document.getElementById("ichcahuipilli").checked) {
        set_parameter(document.getElementById("level_range1"));
        level_range1.style.display = "inline";
        level_range2.style.display = "none";
        level_input.style.display = "none";
        enemy_level.style.display = "inline";

        enemy_resistance.style.display = "inline";
        enemy_resistance.innerText = "10";
        resistance_input.style.display = "none";
        curse_stacks_span.style.display = "inline";

        abyss_tip.style.display = "none";
        foods_select.style.display = "inline";

    } else if (document.getElementById("shouki_no_kami").checked) {
        set_parameter(document.getElementById("level_range2"));
        level_range1.style.display = "none";
        level_range2.style.display = "inline";
        level_input.style.display = "none";
        enemy_level.style.display = "inline";

        enemy_resistance.style.display = "inline";
        enemy_resistance.innerText = "-140";
        resistance_input.style.display = "none";
        curse_stacks_span.style.display = "none";

        abyss_tip.style.display = "none";
        foods_select.style.display = "inline";

    } else if (document.getElementById("abyss").checked) {
        enemy_level.innerText = "65";
        level_range1.style.display = "none";
        level_range2.style.display = "none";
        level_input.style.display = "none";
        enemy_level.style.display = "inline";

        enemy_resistance.style.display = "inline";
        enemy_resistance.innerText = "10";
        resistance_input.style.display = "none";
        curse_stacks_span.style.display = "none";

        abyss_tip.style.display = "inline";
        foods_select.style.display = "none";

    } else {
        set_parameter(document.getElementById("level_input"));
        level_range1.style.display = "none";
        level_range2.style.display = "none";
        level_input.style.display = "inline";
        enemy_level.style.display = "none";

        enemy_resistance.style.display = "none";
        enemy_resistance.innerText = "10"
        resistance_input.style.display = "inline";
        curse_stacks_span.style.display = "none";

        abyss_tip.style.display = "none";
        foods_select.style.display = "inline";
    }
}
set_enemy_level();

// スライダーの値を取得して表示させる関数
function set_parameter(element) {
    element.parentNode.querySelector(".parameter").innerText = element.value;
}

// 複数のチェックボックスを同時に有効化させない関数
// 全てのチェックボックスを無効にする操作も許可する
function exclusive_box(element) {
    element.parentNode.querySelectorAll(".exclusive").forEach(box =>{
        if (box != element) {
            box.checked = false;
        }
    });
}

// 常に一つのみのチェックボックスを有効化させる関数
// ラジオボタンとは少し勝手が違う
function choose_one(element) {
    if (element.checked) {
        element.parentNode.querySelectorAll(".exclusive").forEach(box =>{
            if (box != element) {
                box.checked = false;
            }
        });
    } else {
        element.checked = true;
    }
}

// 負の値の入力を禁止する関数
function never_minus(inputElement) {
    let inputValue = inputElement.value;
    if (inputValue < 0) {
        inputValue = 0;
    }
    inputElement.value = inputValue;
}

let developer_autofill_flag = false;

// 開発者の環境でのステータスなどを自動で入力する関数
function developer_autofill(inputElement) {
    let hp = parseFloat(inputElement.value);
    if (hp == 715) {
        alert("開発者のステータスを入力します");
        document.getElementById("kazuha_team").checked = true;
        document.getElementById("xilonen_team").checked = true;
        document.getElementById("bennett_team").checked = true;
        document.getElementById("furina_team").checked = false;
        document.getElementById("ayaka_team").checked = false;
        document.getElementById("citlali_team").checked = false;

        document.getElementById("homa_refinement").value = 5;
        set_parameter(document.getElementById("homa_refinement"));
        document.getElementById("hutao_skilltalent").value = 13;
        set_parameter(document.getElementById("hutao_skilltalent"));
        document.getElementById("hutao_bursttalent").value = 13;
        set_parameter(document.getElementById("hutao_bursttalent"));
        document.getElementById("hutao_hp").value = 32612;
        document.getElementById("hutao_em").value = 387;
        document.getElementById("hutao_crit_damage").value = 330.2;
        document.getElementById("hutao_artifact_percentage_attack").value = 11.7;
        document.getElementById("hutao_artifact_flat_attack").value = 14;

        document.getElementById("kazuha_initial_em").value = 1067;
        document.getElementById("bennett_initial_hp").value = 45651;
        document.getElementById("furina_talent").value = 13;
        set_parameter(document.getElementById("furina_talent"));
        document.getElementById("furina_initial_hp").value = 67440;
        document.getElementById("citlali_initial_em").value = 740;

        team_caution();
        developer_autofill_flag = true;

    // ついでにHP上限が基礎HPを下回らないようにする
    } else if (hp < 15552 || !hp) {
        inputElement.value = 15552;
    }
}

// これも開発者のためだけのコード
// ベネットが教官4を装備したときはHP上限を45651に、旧貴族4を装備したときは51134に、味方へのバフがない聖遺物を装備したときは55770にする
function bennett_hp_for_developer(){
    // 即座に実行させると他のプログラムと干渉して不具合を起こす気がするため、0.05秒待ってから実行する
    setTimeout(function() {
        let hp;
        if (developer_autofill_flag) {
            if (document.getElementById("bennett_instructor").checked) {
                hp = 45651;
            } else if (document.getElementById("bennett_noblesse").checked) {
                hp = 51134;
            } else {
                hp = 55770;
            }
    
            document.getElementById("bennett_initial_hp").value = hp;
        }
    }, 50);
}


// 教官4や旧貴族4、灰塵4を同時に装備させたときに注意する関数
// ひどい書き方のコードであることは承知しているが、とりあえず動くので技巧的な処理はせず愚直にif文を羅列することにする
function artifact_check() {
    // 即座に実行させると他のプログラムと干渉して不具合を起こすため、0.05秒待ってから実行する
    setTimeout(function() {
        // 教官4
        let count1 = 0;
        if (document.getElementById("xilonen_instructor").checked && document.getElementById("xilonen_team").checked) {
            count1 += 1;
        }
        if (document.getElementById("bennett_instructor").checked && document.getElementById("bennett_team").checked) {
            count1 += 1;
        }
        if (document.getElementById("furina_instructor").checked && document.getElementById("furina_team").checked) {
            count1 += 1;
        }
        if (document.getElementById("ayaka_instructor").checked && document.getElementById("ayaka_team").checked) {
            count1 += 1;
        }
        if (document.getElementById("citlali_instructor").checked && document.getElementById("citlali_team").checked) {
            count1 += 1;
        }

        if (count1 > 1 && document.getElementById("xilonen_instructor").checked && document.getElementById("xilonen_team").checked) {
            document.getElementById("xilonen_instructor_caution").style.display = "inline";
        } else {
            document.getElementById("xilonen_instructor_caution").style.display = "none";
        }
        if (count1 > 1 && document.getElementById("bennett_instructor").checked && document.getElementById("bennett_team").checked) {
            document.getElementById("bennett_instructor_caution").style.display = "inline";
        } else {
            document.getElementById("bennett_instructor_caution").style.display = "none";
        }
        if (count1 > 1 && document.getElementById("furina_instructor").checked && document.getElementById("furina_team").checked) {
            document.getElementById("furina_instructor_caution").style.display = "inline";
        } else {
            document.getElementById("furina_instructor_caution").style.display = "none";
        }
        if (count1 > 1 && document.getElementById("ayaka_instructor").checked && document.getElementById("ayaka_team").checked) {
            document.getElementById("ayaka_instructor_caution").style.display = "inline";
        } else {
            document.getElementById("ayaka_instructor_caution").style.display = "none";
        }
        if (count1 > 1 && document.getElementById("citlali_instructor").checked && document.getElementById("citlali_team").checked) {
            document.getElementById("citlali_instructor_caution").style.display = "inline";
        } else {
            document.getElementById("citlali_instructor_caution").style.display = "none";
        }

        if (count1 > 1) {
            document.getElementById("instructor_caution_view").style.display = "inline";
        } else {
            document.getElementById("instructor_caution_view").style.display = "none";
        }


        // 旧貴族4
        let count2 = 0;
        if (document.getElementById("xilonen_noblesse").checked && document.getElementById("xilonen_team").checked) {
            count2 += 1;
        }
        if (document.getElementById("bennett_noblesse").checked && document.getElementById("bennett_team").checked) {
            count2 += 1;
        }
        if (document.getElementById("furina_noblesse").checked && document.getElementById("furina_team").checked) {
            count2 += 1;
        }
        if (document.getElementById("ayaka_noblesse").checked && document.getElementById("ayaka_team").checked) {
            count2 += 1;
        }
        if (document.getElementById("citlali_noblesse").checked && document.getElementById("citlali_team").checked) {
            count2 += 1;
        }

        if (count2 > 1 && document.getElementById("xilonen_noblesse").checked && document.getElementById("xilonen_team").checked) {
            document.getElementById("xilonen_noblesse_caution").style.display = "inline";
        } else {
            document.getElementById("xilonen_noblesse_caution").style.display = "none";
        }
        if (count2 > 1 && document.getElementById("bennett_noblesse").checked && document.getElementById("bennett_team").checked) {
            document.getElementById("bennett_noblesse_caution").style.display = "inline";
        } else {
            document.getElementById("bennett_noblesse_caution").style.display = "none";
        }
        if (count2 > 1 && document.getElementById("furina_noblesse").checked && document.getElementById("furina_team").checked) {
            document.getElementById("furina_noblesse_caution").style.display = "inline";
        } else {
            document.getElementById("furina_noblesse_caution").style.display = "none";
        }
        if (count2 > 1 && document.getElementById("ayaka_noblesse").checked && document.getElementById("ayaka_team").checked) {
            document.getElementById("ayaka_noblesse_caution").style.display = "inline";
        } else {
            document.getElementById("ayaka_noblesse_caution").style.display = "none";
        }
        if (count2 > 1 && document.getElementById("citlali_noblesse").checked && document.getElementById("citlali_team").checked) {
            document.getElementById("citlali_noblesse_caution").style.display = "inline";
        } else {
            document.getElementById("citlali_noblesse_caution").style.display = "none";
        }

        if (count2 > 1) {
            document.getElementById("noblesse_caution_view").style.display = "inline";
        } else {
            document.getElementById("noblesse_caution_view").style.display = "none";
        }


        // 灰塵4
        let count3 = 0;
        if (document.getElementById("xilonen_cinder_city").checked && document.getElementById("xilonen_team").checked) {
            count3 += 1;
        }
        if (document.getElementById("citlali_cinder_city").checked && document.getElementById("citlali_team").checked) {
            count3 += 1;
        }

        if (count3 > 1 && document.getElementById("xilonen_cinder_city").checked && document.getElementById("xilonen_team").checked) {
            document.getElementById("xilonen_cinder_city_caution").style.display = "inline";
        } else {
            document.getElementById("xilonen_cinder_city_caution").style.display = "none";
        }
        if (count3 > 1 && document.getElementById("citlali_cinder_city").checked && document.getElementById("xilonen_team").checked) {
            document.getElementById("citlali_cinder_city_caution").style.display = "inline";
        } else {
            document.getElementById("citlali_cinder_city_caution").style.display = "none";
        }

        if (count3 > 1) {
            document.getElementById("cinder_city_caution_view").style.display = "inline";
        } else {
            document.getElementById("cinder_city_caution_view").style.display = "none";
        }
    }, 50);
}
artifact_check();

// 聖顕の鍵の精錬ランクをリンクさせる関数
function key_refinement(element) {
    if (element.id == "bennett_key_refinement") {
        document.getElementById("furina_key_refinement").value = element.value;
        set_parameter(document.getElementById("furina_key_refinement"));
    } else {
        document.getElementById("bennett_key_refinement").value = element.value;
        set_parameter(document.getElementById("bennett_key_refinement"));
    }
}


// 護摩の杖と聖顕の鍵の精錬ランクを変えたときに所定の入力値の変更を提案する機能
// keep_to_change が0なら常に変更しない、1なら常に変更する、そして2ならその都度尋ねる
let keep_to_change = 2;

// 「その他」の「詳細設定」で行う設定
function change_status() {
    if (document.getElementById("confirm_change").checked) {
        keep_to_change = 1;
    } else if (document.getElementById("ignore_change").checked) {
        keep_to_change = 0;
    } else {
        keep_to_change = 2;
    }
    document.getElementById("keep_to_change1").checked = false;
    document.getElementById("keep_to_change2").checked = false;
}

// 護摩の杖の精錬ランクを変えたときにHP上限の変更を提案する関数
let past_homaR = 1;
let new_hutaohp;

function change_hutao_hp() {
    if (keep_to_change == 0) {} else {
        let current_homaR = parseFloat(document.getElementById("homa_refinement").value);
        let hutao_hp = parseFloat(document.getElementById("hutao_hp").value);
        let delta_hp = 15552.31 * 0.05*(current_homaR-past_homaR);
        new_hutaohp = Math.round((hutao_hp + delta_hp) * 100)/100;

        if (keep_to_change == 2) {
            let delta_hp_p;
            if (current_homaR > past_homaR) {
                delta_hp_p = String(5 * (current_homaR-past_homaR)) + "%高い";
            } else {
                delta_hp_p = String(5 * (past_homaR-current_homaR)) + "%低い";
            }

            document.getElementById("pop_up1_sentence").innerHTML =
            `
            <p>
                護摩の杖の精錬ランクを${past_homaR}から${current_homaR}に変更しました。<br>
                胡桃のHP上限を今より${delta_hp_p}${new_hutaohp}に変更しますか？<br>
            </p>
            `;
            document.getElementById("pop_up1").style.display = "inline";
        }

        past_homaR = current_homaR;
        if (keep_to_change == 1) {confirm_hutao_hp();}
    }
}

function confirm_hutao_hp() {
    document.getElementById("hutao_hp").value = new_hutaohp;
    document.getElementById("pop_up1").style.display = "none";

    if (document.getElementById("keep_to_change1").checked) {
        keep_to_change = 1;
        document.getElementById("confirm_change").checked = true;
        document.getElementById("ignore_change").checked = false;
    }
}

function ignore_hutao_hp() {
    document.getElementById("pop_up1").style.display = "none";

    if (document.getElementById("keep_to_change1").checked) {
        keep_to_change = 0;
        document.getElementById("confirm_change").checked = false;
        document.getElementById("ignore_change").checked = true;
    }
}


// ベネットの聖顕の鍵の精錬ランクを変えたときにHP上限の変更を提案する関数
let past_keyR = 1;
let new_bennetthp;

function change_bennett_hp() {
    if (keep_to_change == 0) {} else {
        let current_keyR = parseFloat(document.getElementById("bennett_key_refinement").value);
        let bennett_hp = parseFloat(document.getElementById("bennett_initial_hp").value);
        let delta_hp = 12397.40 * 0.05*(current_keyR-past_keyR);
        new_bennetthp = Math.round((bennett_hp + delta_hp) * 100)/100;

        if (keep_to_change == 2) {
            let delta_hp_p;
            if (current_keyR > past_keyR) {
                delta_hp_p = String(5 * (current_keyR-past_keyR)) + "%高い";
            } else {
                delta_hp_p = String(5 * (past_keyR-current_keyR)) + "%低い";
            }

            document.getElementById("pop_up2_sentence").innerHTML =
            `
            <p>
                聖顕の鍵の精錬ランクを${past_keyR}から${current_keyR}に変更しました。<br>
                ベネットのHP上限を今より${delta_hp_p}${new_bennetthp}に変更しますか？<br>
            </p>
            `;
            document.getElementById("pop_up2").style.display = "inline";
        }

        past_keyR = current_keyR;
        if (keep_to_change == 1) {confirm_bennett_hp();}
    }
}

function confirm_bennett_hp() {
    document.getElementById("bennett_initial_hp").value = new_bennetthp;
    document.getElementById("pop_up2").style.display = "none";

    if (document.getElementById("keep_to_change2").checked) {
        keep_to_change = 1;
        document.getElementById("confirm_change").checked = true;
        document.getElementById("ignore_change").checked = false;
    }
}
function ignore_bennett_hp() {
    document.getElementById("pop_up2").style.display = "none";

    if (document.getElementById("keep_to_change2").checked) {
        keep_to_change = 0;
        document.getElementById("confirm_change").checked = false;
        document.getElementById("ignore_change").checked = true;
    }
}


// フリーナの聖顕の鍵の精錬ランクを変えたときにHP上限の変更を提案する関数
let new_furinahp;

function change_furina_hp() {
    if (keep_to_change == 0) {} else {
        let current_keyR = parseFloat(document.getElementById("furina_key_refinement").value);
        let furina_hp = parseFloat(document.getElementById("furina_initial_hp").value);
        let delta_hp = 15307.39 * 0.05*(current_keyR-past_keyR);
        new_furinahp = Math.round((furina_hp + delta_hp) * 100)/100;

        if (keep_to_change == 2) {
            let delta_hp_p;
            if (current_keyR > past_keyR) {
                delta_hp_p = String(5 * (current_keyR-past_keyR)) + "%高い";
            } else {
                delta_hp_p = String(5 * (past_keyR-current_keyR)) + "%低い";
            }

            document.getElementById("pop_up3_sentence").innerHTML =
            `
            <p>
                聖顕の鍵の精錬ランクを${past_keyR}から${current_keyR}に変更しました。<br>
                フリーナのHP上限を今より${delta_hp_p}${new_furinahp}に変更しますか？<br>
            </p>
            `;
            document.getElementById("pop_up3").style.display = "inline";
        }

        past_keyR = current_keyR;
        if (keep_to_change == 1) {confirm_furina_hp();}
    }
}

function confirm_furina_hp() {
    document.getElementById("furina_initial_hp").value = new_furinahp;
    document.getElementById("pop_up3").style.display = "none";

    if (document.getElementById("keep_to_change3").checked) {
        keep_to_change = 1;
        document.getElementById("confirm_change").checked = true;
        document.getElementById("ignore_change").checked = false;
    }
}
function ignore_furina_hp() {
    document.getElementById("pop_up3").style.display = "none";

    if (document.getElementById("keep_to_change3").checked) {
        keep_to_change = 0;
        document.getElementById("confirm_change").checked = false;
        document.getElementById("ignore_change").checked = true;
    }
}


// 最終ダメージの記憶・比較機能の制御 (GPT-4o作)
const table = document.getElementById('comparison_table').querySelector('tbody');
const addRowButton = document.getElementById('addRowButton');

// ダメージ増加量とダメージ増加比の計算
const updateRowNumbers = () => {
    const selectedRow = table.querySelector('input[name="damage_comparision"]:checked');
    if (selectedRow) {
        const row = selectedRow.closest('tr');
        var criterion = parseFloat(row.childNodes[2].innerText.replace(/,/g, ""));
        if (criterion) {
            // console.log(`選択された行の数値: ${criterion}`);
        }
    }

    const rows = table.querySelectorAll('tr');
    rows.forEach((row) => {
        let damage = parseFloat(row.cells[2].innerText.replace(/,/g, ""));
        row.cells[3].textContent = (damage - criterion).toLocaleString();
        row.cells[4].textContent = String(Math.round(100 * (damage / criterion - 1) * 10)/10) + "%";
    });
};

// 現在のダメージの記憶
addRowButton.addEventListener('click', () => {
    const newRow = document.createElement('tr');

    const criterionCell = document.createElement('td');
    const radioElement = document.createElement('input');
    radioElement.type = 'radio';
    radioElement.name = 'damage_comparision';
    if (table.querySelectorAll('tr').length == 0) {
        radioElement.checked = 'true';
    }
    radioElement.addEventListener('change', () => {
        updateRowNumbers();
    });
    criterionCell.appendChild(radioElement);
    newRow.appendChild(criterionCell);

    const inputCell = document.createElement('td');
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.className = 'text_input';
    inputCell.appendChild(inputElement);
    newRow.appendChild(inputCell);

    const damageCell = document.createElement('td');
    damageCell.innerText = Math.round(calculate_damage()).toLocaleString();
    newRow.appendChild(damageCell);

    newRow.appendChild(document.createElement('td'));
    newRow.appendChild(document.createElement('td'));

    const buttonCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.className = 'deleteRowButton';
    deleteButton.addEventListener('click', () => {
        // ここのコードは私が書いたので汚い
        // 基準となる行を削除したときに先頭の行を新たに基準にするプログラム
        flag = false;
        if (newRow.children[0].children[0].checked && table.childNodes.length != 2) {
            flag = true;
        }
        newRow.remove();
        updateRowNumbers();
        if (flag) {
            table.querySelector('input').checked = true;
        }
    });
    buttonCell.appendChild(deleteButton);
    newRow.appendChild(buttonCell);

    table.appendChild(newRow);
});

const observer = new MutationObserver(() => {
    updateRowNumbers();
});
observer.observe(table, { childList: true });




// 参考値の入力とバフの計算

// 胡桃の攻撃力の計算

// 胡桃の元素スキルと護摩の杖による攻撃力の上昇を純粋に計算する補助関数
// overHP が真ならスキルによる攻撃力上昇が上限に達している
function hutao_attack_byHP(hp) {
    let overHP = false;
    let attack = hp * (0.014+0.004*parseFloat(document.getElementById("homa_refinement").value));

    let skill_attackbuff = hp * {9: 0.0596, 10: 0.0626, 11: 0.0656, 12: 0.0685, 13: 0.0715}
    [parseFloat(document.getElementById("hutao_skilltalent").value)];

    if (skill_attackbuff <= 715 * 4) {
        attack += skill_attackbuff;
    } else {
        attack += 715 * 4;
        overHP = true;
    }

    return [overHP, attack];
}

// 基礎攻撃力と聖遺物による攻撃力上昇を計算する補助関数
function hutao_basic_attack() {
    let attack = 715;
    attack += 715 * 0.01*parseFloat(document.getElementById("hutao_artifact_percentage_attack").value);
    attack += parseFloat(document.getElementById("hutao_artifact_flat_attack").value) + 311;

    return attack;
}

// 参考値の胡桃の最終攻撃力の入力
// 元素スキルによる攻撃力上昇が上限に達しているという注意は、最終ステータスの計算のときに行う
function hutao_attack() {
    let hutao_hp = parseFloat(document.getElementById("hutao_hp").value);
    let attack = hutao_basic_attack() + hutao_attack_byHP(hutao_hp)[1];

    // 結果の表示
    document.getElementById("hutao_attack").innerText = Math.round(attack * 100)/100;
    return attack;
}


// 万葉の最終元素熟知と炎元素ダメージバフの計算
function kazuha_dmgbuff() {
    let kazuha_em = parseFloat(document.getElementById("kazuha_initial_em").value);
    if (document.getElementById("kazuha_constellation").checked) {
        kazuha_em += 200;
    }
    if (document.getElementById("kazuha_instructor").checked) {
        if (document.getElementById("xilonen_instructor").checked && document.getElementById("xilonen_team").checked ||
            document.getElementById("bennett_instructor").checked && document.getElementById("bennett_team").checked ||
            document.getElementById("furina_instructor").checked && document.getElementById("furina_team").checked ||
            document.getElementById("ayaka_instructor").checked && document.getElementById("ayaka_team").checked ||
            document.getElementById("citlali_instructor").checked && document.getElementById("citlali_team").checked) {
            kazuha_em += 120;
        }
    }
    if (document.getElementById("citlali_2c_kazuha").checked) {
        if (parseFloat(document.getElementById("citlali_constellation").value) >= 2 && document.getElementById("citlali_team").checked) {
            kazuha_em += 250;
        }
    }
    if (document.getElementById("additional_em_allmenber").checked) {
        kazuha_em += parseFloat(document.getElementById("hutao_additional_em").value);
    }

    document.getElementById("kazuha_ultimate_em").innerText = Math.round(kazuha_em * 10)/10;

    let kazuha_dmgbuff = kazuha_em * 0.04;
    document.getElementById("kazuha_dmgbuff").innerText = String(Math.round(kazuha_dmgbuff * 1000)/1000) + "%";

    return kazuha_dmgbuff;
}


// ベネットの最終HP上限と聖顕の鍵による元素熟知バフの計算
function bennett_em() {
    if (document.getElementById("bennett_key").checked) {
        let bennett_hp = parseFloat(document.getElementById("bennett_initial_hp").value);
        if (document.getElementById("pour_la_justice").checked) {
            bennett_hp += 12397.40 * 0.3;
        }
        if (document.getElementById("additional_percentage_hp_allmenber").checked) {
            bennett_hp += 12397.40 * 0.01*parseFloat(document.getElementById("hutao_additional_percentage_hp").value);
        }
    
        bennett_hp = Math.round(bennett_hp * 10)/10;
        document.getElementById("bennett_ultimate_hp").innerText = bennett_hp;
    
        let key_refinement = parseFloat(document.getElementById("bennett_key_refinement").value);
        let bennett_embuff = bennett_hp * (0.0015+0.0005*key_refinement);
        document.getElementById("bennett_embuff").innerText = Math.round(bennett_embuff * 10)/10;
    
        return bennett_embuff;

    } else {
        document.getElementById("bennett_embuff").innerText = 0;
        return 0;
    }
}


// フリーナの最終HP上限と聖顕の鍵による元素熟知バフの計算
function furina_em() {
    let furina_hp = parseFloat(document.getElementById("furina_initial_hp").value);
    if (document.getElementById("pour_la_justice").checked) {
        furina_hp += 15307.39 * 0.3;
    }
    if (document.getElementById("furina_2c").checked) {
        furina_hp += 15307.39 * 1.4;
    }
    if (document.getElementById("xilonen_furina_2c").checked && document.getElementById("xilonen_team").checked) {
        furina_hp += 15307.39 * 0.45;
    }
    if (document.getElementById("additional_percentage_hp_allmenber").checked) {
        furina_hp += 15307.39 * 0.01*parseFloat(document.getElementById("hutao_additional_percentage_hp").value);
    }

    furina_hp = Math.round(furina_hp * 10)/10;
    document.getElementById("furina_ultimate_hp").innerText = furina_hp;

    let key_refinement = parseFloat(document.getElementById("furina_key_refinement").value);
    let furina_embuff = Math.round(furina_hp * (0.0015+0.0005*key_refinement)*10)/10;
    document.getElementById("furina_embuff").innerText = furina_embuff;

    return furina_embuff;
}


// シトラリの最終元素熟知と1凸効果による実数ダメージバフの計算
function citlali_additive_damagebuff() {
    if (parseFloat(document.getElementById("citlali_constellation").value) >= 1) {
        let em = parseFloat(document.getElementById("citlali_initial_em").value);

        if (parseFloat(document.getElementById("citlali_constellation").value) >= 2) {
            em += 125;
        }

        if (document.getElementById("citlali_starcaller").checked) {
            em += 265;
            em += 75 + 25*parseFloat(document.getElementById("citlali_starcaller_refinement").value);
        }
        if (document.getElementById("citlali_sacrificial").checked) {
            em += 221;
        }

        if (document.getElementById("kazuha_citlali_2c").checked && document.getElementById("kazuha_constellation").checked && document.getElementById("kazuha_team").checked) {
            em += 200;
        }
        if (document.getElementById("instructor_citlali_2c").checked) {
            if (document.getElementById("xilonen_instructor").checked && document.getElementById("xilonen_team").checked ||
                document.getElementById("bennett_instructor").checked && document.getElementById("bennett_team").checked ||
                document.getElementById("furina_instructor").checked && document.getElementById("furina_team").checked ||
                document.getElementById("ayaka_instructor").checked && document.getElementById("ayaka_team").checked ||
                document.getElementById("citlali_instructor").checked && document.getElementById("citlali_team").checked) {
            em += 120;
            }
        }
        if (document.getElementById("key_citlali_2c").checked) {
            if (document.getElementById("bennett_team").checked) {
                em += bennett_em();
            }
            if (document.getElementById("furina_team").checked) {
                em += furina_em();
            }
        }

        if (document.getElementById("additional_em_allmenber").checked) {
            em += parseFloat(document.getElementById("hutao_additional_em").value);
        }

        document.getElementById("citlali_ultimate_em").innerText = Math.round(em * 10)/10;

        let additive_damagebuff = 2 * em;
        document.getElementById("citlali_additive_damagebuff").innerText = Math.round(additive_damagebuff * 10)/10;

        return additive_damagebuff;

    } else {
        return 0;
    }
}



// ステータスの確認

// インプットの入力が変化するたびに処理を実行させる
document.addEventListener("change", function() {
    // 即座に実行すると種々の処理の前に実行され不具合が起こるため、0.05秒待機してから実行
    setTimeout(calculate_delta_damage, 50);
});

// ボタンをクリックするたびに処理を実行させる
Array.from(document.getElementsByTagName("button")).forEach(button => {
    button.addEventListener("click", function(){
        setTimeout(calculate_delta_damage, 50);
    });
});


// ステータスの計算・バフとデバフの合計・ダメージ計算
function calculate_damage(hp = 0, attack = 0, em = 0, crit_damage = 0) {
    // 胡桃の自己バフ
    // 百分率で表示されるものはその百分率での値を入力する
    let elemental_reactiondmg = 0;
    let damage_buff = 0;
    let additive_damagebuff = 0;
    let defence = 0;
    let elemental_res = 0;


    // 胡桃の設定
    // 仕様上、値の上書きは不要
    hp += parseFloat(document.getElementById("hutao_hp").value);
    document.getElementById("hp_h").innerText = Math.round(hp);

    // 胡桃の攻撃力はHP上限が決まった後にちゃんと計算する
    document.getElementById("attack_h").innerText = Math.round(hutao_attack());

    em += parseFloat(document.getElementById("hutao_em").value);
    document.getElementById("em_h").innerText = Math.round(em);

    elemental_reactiondmg += 15;
    document.getElementById("elemental_reactiondmg_h").innerText = String(Math.round(elemental_reactiondmg))+"%";

    crit_damage += parseFloat(document.getElementById("hutao_crit_damage").value);
    document.getElementById("crit_damage_h").innerText = String(Math.round(crit_damage * 10)/10)+"%";

    damage_buff += 15 + 7.5 + 46.6 + 33;
    document.getElementById("damage_buff_h").innerText = String(Math.round(damage_buff * 10)/10)+"%";

    // 0にしかなり得ないものは初めから入力しない
    // document.getElementById("additive_damagebuff_h").innerText = Math.round(additive_damagebuff *10)/10;
    // document.getElementById("defence_h").innerText = String(Math.round(defence *10)/10)+"%";
    // document.getElementById("elemental_res_h").innerText = String(Math.round(elemental_res *10)/10)+"%";



    // サポーターのバフ・デバフの合計
    let hp_s = 0;
    let flat_attack_s = 0;
    let percentage_attack_s = 0;
    let em_s = 0;
    let elemental_reactiondmg_s = 0;
    let crit_damage_s = 0;
    let damage_buff_s = 0;
    let additive_damagebuff_s = 0;
    let defence_s = 0;
    let elemental_res_s = 0;

    // 各キャラクターごとのバフ・デバフの計算

    // 聖遺物のバフ
    // 旧貴族4と教官4
    if ((document.getElementById("xilonen_noblesse").checked && document.getElementById("xilonen_team").checked) ||
        (document.getElementById("bennett_noblesse").checked && document.getElementById("bennett_team").checked) ||
        (document.getElementById("furina_noblesse").checked && document.getElementById("furina_team").checked) ||
        (document.getElementById("ayaka_noblesse").checked && document.getElementById("ayaka_team").checked) ||
        (document.getElementById("citlali_noblesse").checked && document.getElementById("citlali_team").checked)) {
        percentage_attack_s += 20;
    }

    if ((document.getElementById("xilonen_instructor").checked && document.getElementById("xilonen_team").checked) ||
        (document.getElementById("bennett_instructor").checked && document.getElementById("bennett_team").checked) ||
        (document.getElementById("furina_instructor").checked && document.getElementById("furina_team").checked) ||
        (document.getElementById("ayaka_instructor").checked && document.getElementById("ayaka_team").checked) ||
        (document.getElementById("citlali_instructor").checked && document.getElementById("citlali_team").checked)) {
        em_s += 120;
    }

    // 灰塵4
    if ((document.getElementById("xilonen_cinder_city").checked && document.getElementById("xilonen_team").checked) ||
        (document.getElementById("citlali_cinder_city").checked && document.getElementById("citlali_team").checked)) {
        damage_buff_s += 40;
    }
    

    // 万葉のバフ・デバフ
    let dmgbuff_kazuha = kazuha_dmgbuff();
    if (document.getElementById("kazuha_team").checked) {
        if (document.getElementById("kazuha_constellation").checked) {
            em_s += 200;
        }
    
        percentage_attack_s +=
        15 + 5*parseFloat(document.getElementById("freedom_refinement").value);
        
        elemental_res_s += -40;
    
        damage_buff_s += dmgbuff_kazuha;
    }

    // シロネンのバフ・デバフ
    if (document.getElementById("xilonen_team").checked) {
        percentage_attack_s += 45;

        damage_buff_s += 19.2 + 6.4*parseFloat(document.getElementById("peak_refinement").value);

        elemental_res_s += -6 - 3*parseFloat(document.getElementById("xilonen_talent").value);
    }

    // ベネットのバフ
    let em_bennett = bennett_em();
    if (document.getElementById("bennett_team").checked) {
        if (document.getElementById("bennett_key").checked) {
            flat_attack_s += (1.19+0.2) * (191.16+542);
        } else {
            flat_attack_s += (1.19+0.2) * (191.16+674);
        }

        // ここで炎元素共鳴の効果を計上しておく
        percentage_attack_s += 25;

        damage_buff_s += 15;

        em_s += em_bennett;
    }

    // フリーナのバフ
    let em_furina = furina_em();
    if (document.getElementById("furina_team").checked) {
        damage_buff_s +=
        400 * (0.05 + 0.02*parseFloat(document.getElementById("furina_talent").value));

        em_s += em_furina;
    }

    // 神里綾華のバフ
    if (document.getElementById("ayaka_team").checked) {
        defence_s += -30;
    }

    // シトラリのバフ・デバフ
    let additive_damagebuff_citlali = citlali_additive_damagebuff();
    if (document.getElementById("citlali_team").checked) {
        additive_damagebuff_s = additive_damagebuff_citlali;
        if (parseFloat(document.getElementById("citlali_constellation").value) >= 2) {
            em_s += 250;
            elemental_res_s += -20;
        }
        if (parseFloat(document.getElementById("citlali_constellation").value) == 6) {
            damage_buff_s += 60;
        }

        if (document.getElementById("citlali_starcaller").checked) {
            damage_buff_s += 21 + 7*parseFloat(document.getElementById("citlali_starcaller_refinement").value);
        }
        if (document.getElementById("citlali_dragon").checked) {
            percentage_attack_s += 48;
        }

        elemental_res_s += -20;
    }


    // サポーターのバフ・デバフの出力
    if (hp_s) {
        document.getElementById("hp_s").innerText = String(Math.round(hp_s * 10)/10)+"%";
    } else {
        document.getElementById("hp_s").innerText = "";
    }

    let attack_s = ``;
    if (flat_attack_s && percentage_attack_s) {
        attack_s = `${Math.round(flat_attack_s)}<br>${Math.round(percentage_attack_s * 10)/10}%`;
    } else if (flat_attack_s) {
        attack_s = `${Math.round(flat_attack_s)}`;
    } else if (percentage_attack_s) {
        attack_s = `${Math.round(percentage_attack_s * 10)/10}%`;
    }
    document.getElementById("attack_s").innerHTML = attack_s;

    if (em_s) {
        document.getElementById("em_s").innerText = Math.round(em_s);
    } else {
        document.getElementById("em_s").innerText = "";
    }
    
    if (elemental_reactiondmg_s) {
        document.getElementById("elemental_reactiondmg_s").innerText = String(Math.round(elemental_reactiondmg_s * 10)/10)+"%";
    } else {
        document.getElementById("elemental_reactiondmg_s").innerText = "";
    }
    
    if (crit_damage_s) {
        document.getElementById("crit_damage_s").innerText = String(Math.round(crit_damage_s * 10)/10)+"%";
    } else {
        document.getElementById("crit_damage_s").innerText = "";
    }
    
    if (damage_buff_s) {
        document.getElementById("damage_buff_s").innerText = String(Math.round(damage_buff_s * 10)/10)+"%";
    } else {
        document.getElementById("damage_buff_s").innerText = "";
    }

    if (additive_damagebuff_s) {
        document.getElementById("additive_damagebuff_s").innerText = Math.round(additive_damagebuff_s * 10)/10;
    } else {
        document.getElementById("additive_damagebuff_s").innerText = "";
    }

    if (defence_s) {
        document.getElementById("defence_s").innerText = String(Math.round(defence_s * 10)/10)+"%";
    } else {
        document.getElementById("defence_s").innerText = "";
    }
    
    if (elemental_res_s) {
        document.getElementById("elemental_res_s").innerText = String(Math.round(elemental_res_s * 10)/10)+"%";
    } else {
        document.getElementById("elemental_res_s").innerText = "";
    }
    


    // 料理・薬剤などその他の合計
    let hp_o = 0;
    let flat_attack_o = 0;
    let percentage_attack_o = 0;
    let em_o = 0;
    let elemental_reactiondmg_o = 0;
    let crit_damage_o = 0;
    let damage_buff_o = 0;
    let additive_damagebuff_o = 0;
    let defence_o = 0;
    let elemental_res_o = 0;

    // 敵設定
    if (document.getElementById("abyss").checked) {
        crit_damage_o += 120;
    }

    if (document.getElementById("ichcahuipilli").checked) {
        damage_buff_o += 60 * parseFloat(document.getElementById("curse_stacks_input").value)
    }

    elemental_res_o += parseFloat(document.getElementById("enemy_resistance").innerText);

    // 飯バフ
    if (document.getElementById("abyss").checked) {} else {
        if (document.getElementById("adeptus's_temptation").checked) {
            flat_attack_o += 372;
        }

        if (document.getElementById("mondstadt").checked) {
            crit_damage_o += 20;
        }

        if (document.getElementById("pour_la_justice").checked) {
            hp_o += 30;
        }

        if (document.getElementById("flaming_oil").checked) {
            damage_buff_o += 25;
        }
    }

    // カスタムバフ
    hp_o += parseFloat(document.getElementById("hutao_additional_percentage_hp").value);
    percentage_attack_o += parseFloat(document.getElementById("hutao_additional_percentage_attack").value);
    flat_attack_o += parseFloat(document.getElementById("hutao_additional_flat_attack").value);
    em_o += parseFloat(document.getElementById("hutao_additional_em").value);
    elemental_reactiondmg_o += parseFloat(document.getElementById("hutao_additional_reaction_dmgbonus").value);
    crit_damage_o += parseFloat(document.getElementById("hutao_additional_crit_damage").value);
    damage_buff_o += parseFloat(document.getElementById("hutao_additional_damage_buff").value);
    additive_damagebuff_o += parseFloat(document.getElementById("hutao_additional_additive_damagebuff").value);
    defence_o += parseFloat(document.getElementById("hutao_additional_defence").value);
    elemental_res_o += parseFloat(document.getElementById("hutao_additional_resistance").value);


    // 料理・薬剤などその他の出力
    if (hp_o) {
        document.getElementById("hp_o").innerText = String(Math.round(hp_o * 10)/10)+"%";
    } else {
        document.getElementById("hp_o").innerText = "";
    }

    let attack_o = ``;
    if (flat_attack_o && percentage_attack_o) {
        attack_o = `${Math.round(flat_attack_o)}<br>${Math.round(percentage_attack_o * 10)/10}%`;
    } else if (flat_attack_o) {
        attack_o = `${Math.round(flat_attack_o)}`;
    } else if (percentage_attack_o) {
        attack_o = `${Math.round(percentage_attack_o * 10)/10}%`;
    }
    document.getElementById("attack_o").innerHTML = attack_o;

    if (em_o) {
        document.getElementById("em_o").innerText = Math.round(em_o);
    } else {
        document.getElementById("em_o").innerText = "";
    }
    
    if (elemental_reactiondmg_o) {
        document.getElementById("elemental_reactiondmg_o").innerText = String(Math.round(elemental_reactiondmg_o * 10)/10)+"%";
    } else {
        document.getElementById("elemental_reactiondmg_o").innerText = "";
    }
    
    if (crit_damage_o) {
        document.getElementById("crit_damage_o").innerText = String(Math.round(crit_damage_o * 10)/10)+"%";
    } else {
        document.getElementById("crit_damage_o").innerText = "";
    }
    
    if (damage_buff_o) {
        document.getElementById("damage_buff_o").innerText = String(Math.round(damage_buff_o * 10)/10)+"%";
    } else {
        document.getElementById("damage_buff_o").innerText = "";
    }

    if (additive_damagebuff_o) {
        document.getElementById("additive_damagebuff_o").innerText = Math.round(additive_damagebuff_o * 10)/10;
    } else {
        document.getElementById("additive_damagebuff_o").innerText = "";
    }

    if (defence_o) {
        document.getElementById("defence_o").innerText = String(Math.round(defence_o * 10)/10)+"%";
    } else {
        document.getElementById("defence_o").innerText = "";
    }
    
    if (elemental_res_o) {
        document.getElementById("elemental_res_o").innerText = String(Math.round(elemental_res_o * 10)/10)+"%";
    } else {
        document.getElementById("elemental_res_o").innerText = "";
    }



    // 胡桃の最終ステータスの計算
    hp += 15552.31 * 0.01*(hp_s + hp_o);

    // 胡桃のスキルによる攻撃力上昇が上限に達したとき注意を表示する
    if (hutao_attack_byHP(hp)[0]) {
        document.getElementById("hutao_skill_caution").style.display = "inline";
        document.getElementById("hutao_skill_caution_view").style.display = "inline";
    } else {
        document.getElementById("hutao_skill_caution").style.display = "none";
        document.getElementById("hutao_skill_caution_view").style.display = "none";
    }


    // 胡桃のHPが確定したあとに攻撃力を再度計算しないといけない
    attack += hutao_basic_attack() + hutao_attack_byHP(hp)[1];
    attack += flat_attack_s + 715*0.01*percentage_attack_s + flat_attack_o + 715*0.01*percentage_attack_o;

    em += em_s + em_o;
    elemental_reactiondmg += elemental_reactiondmg_s + elemental_reactiondmg_o;
    crit_damage += crit_damage_s + crit_damage_o;
    damage_buff += damage_buff_s + damage_buff_o;
    additive_damagebuff += additive_damagebuff_s + additive_damagebuff_o;
    defence += defence_s + defence_o;
    elemental_res += elemental_res_s + elemental_res_o;

    // 胡桃の最終ステータスの入力
    document.getElementById("hp_u").innerText = Math.round(hp);
    document.getElementById("attack_u").innerText = Math.round(attack);
    document.getElementById("em_u").innerText = Math.round(em);
    document.getElementById("elemental_reactiondmg_u").innerText = String(Math.round(elemental_reactiondmg * 10)/10)+"%";
    document.getElementById("crit_damage_u").innerText = String(Math.round(crit_damage * 10)/10)+"%";
    document.getElementById("damage_buff_u").innerText = String(Math.round(damage_buff * 10)/10)+"%";

    if (additive_damagebuff) {
        document.getElementById("additive_damagebuff_u").innerText = Math.round(additive_damagebuff * 10)/10;
    } else {
        document.getElementById("additive_damagebuff_u").innerText = "";
    }
    if (defence) {
        document.getElementById("defence_u").innerText = String(Math.round(defence * 10)/10)+"%";
    } else {
        document.getElementById("defence_u").innerText = "";
    }

    // 最終的な元素耐性が0%ならその通りに入力する
    document.getElementById("elemental_res_u").innerText = String(Math.round(elemental_res * 10)/10)+"%";

    

    // ダメージ計算式における各乗算因子の計算
    document.getElementById("attack_fm").innerText = Math.round(attack);

    let skilldamage = {9: 5.8793, 10: 6.1744, 11: 6.4695, 12: 6.7646, 13: 7.0597}
    [parseFloat(document.getElementById("hutao_bursttalent").value)];
    document.getElementById("skilldamage_fm").innerText = Math.round(skilldamage * 100)/100;
    document.getElementById("additive_damagebuff_fm").innerText = Math.round(additive_damagebuff * 10)/10;
    document.getElementById("damage_buff_fm").innerText = Math.round((1 + 0.01*damage_buff) * 100)/100;
    document.getElementById("crit_damage_fm").innerText = Math.round((1 + 0.01*crit_damage) * 100)/100;

    let reaction_multiplier;
    if (document.getElementById("melt").checked) {
        reaction_multiplier = 2;
    } else if (document.getElementById("vaporize").checked) {
        reaction_multiplier = 1.5;
    } else {
        reaction_multiplier = 1;
    }
    document.getElementById("reaction_multiplier_fm").innerText = Math.round(reaction_multiplier * 10)/10;

    let reaction_dmgbonus = 1+ 0.01*elemental_reactiondmg + 2.78*em/(1400+em);
    document.getElementById("reaction_dmgbonus_fm").innerText = Math.round(reaction_dmgbonus * 1000)/1000;

    // 敵の防御力は-100%より小さくならない
    if (defence < -100) {
        document.getElementById("enemy_defence_formula").innerHTML =
        `
        <div class="fraction">
            <sup>胡桃のレベル + 100</sup>
            <span>─────────────────────────────────</span>
            <sub>(1 - 1)(敵レベル+100) + 胡桃のレベル+100</sub>
        </div>
        `;
        defence = -100;
    } else {
        document.getElementById("enemy_defence_formula").innerHTML =
        `
        <div class="fraction">
            <sup>胡桃のレベル + 100</sup>
            <span>─────────────────────────────────</span>
            <sub>(1+敵の防御力)(敵レベル+100) + 胡桃のレベル+100</sub>
        </div>
        `;
    }

    let enemy_level = parseFloat(document.getElementById("enemy_level").innerText);
    let enemy_defence = (90+100)/((1+0.01*defence)*(enemy_level+100) + 90+100);
    document.getElementById("enemy_defence_fm").innerText = Math.round(enemy_defence * 1000)/1000;

    if (elemental_res <= 0) {
        document.getElementById("enemy_resistance_formula").innerHTML = `1 - 0<b>.</b>5×敵の元素耐性`;
        // いいかげんな変数の使い方だが、まあ問題ないだろう
        elemental_res = 1 - 0.01*elemental_res/2;

    } else if (elemental_res <= 75) {
        document.getElementById("enemy_resistance_formula").innerHTML = `1 - 敵の元素耐性`;
        elemental_res = 1 - 0.01*elemental_res;

    } else {
        document.getElementById("enemy_resistance_formula").innerHTML =
        `
        <div class="fraction">
            <sup>1</sup>
            <span>──────────────</span>
            <sub>4 × 敵の元素耐性 + 1</sub>
        </div>
        `;
        elemental_res = 1 / (4*0.01*elemental_res + 1);
    }
    
    document.getElementById("elemental_res_fm").innerText = Math.round(elemental_res * 100)/100;
    

    // ダメージ計算
    let damage = (attack * skilldamage + additive_damagebuff) * (1+0.01*damage_buff) * (1+0.01*crit_damage) * reaction_multiplier *
    reaction_dmgbonus * enemy_defence * elemental_res;

    // ダメージを四捨五入した値が20,000,000を超えている場合、ダメージを20,000,000と表示して注意を行う
    if (Math.round(damage) > 20000000) {
        document.getElementById("damage_limit").style.display = "inline";
        document.getElementById("damage_limit_view").style.display = "inline";
        document.getElementById("real_damage").innerText = Math.round(damage).toLocaleString();

        damage = 20000000;
    } else {
        document.getElementById("damage_limit").style.display = "none";
        document.getElementById("damage_limit_view").style.display = "none";
    }

    document.getElementById("damage_fm").innerText = Math.round(damage).toLocaleString();
    document.getElementById("damage").innerText = Math.round(damage).toLocaleString();
    
    return damage;
}


// 聖遺物更新によるダメージ増加のデモンストレーション
function calculate_delta_damage() {
    let hp_percentage_damage = calculate_damage(hp = 15552.31*0.0525);
    let hp_flat_damage = calculate_damage(hp = 269);
    let attack_percentage_damage = calculate_damage(hp = 0, attack = 715*0.0525);
    let attack_flat_damage = calculate_damage(hp = 0, attack = 18);
    let em_damage = calculate_damage(hp = 0, attack = 0, em = 21);
    let crit_damage_damage = calculate_damage(hp = 0, attack = 0, em = 0, crit_damage = 6.99);

    // 最後に通常のダメージを計算することにより種々のバグを避けている
    let damage = calculate_damage();

    document.getElementById("dmg_increase_hp_percentage").innerText = Math.round(hp_percentage_damage - damage).toLocaleString();
    document.getElementById("dmg_increase_hp_flat").innerText = Math.round(hp_flat_damage - damage).toLocaleString();
    document.getElementById("dmg_increase_attack_percentage").innerText = Math.round(attack_percentage_damage - damage).toLocaleString();
    document.getElementById("dmg_increase_attack_flat").innerText = Math.round(attack_flat_damage - damage).toLocaleString();
    document.getElementById("dmg_increase_em").innerText = Math.round(em_damage - damage).toLocaleString();
    document.getElementById("dmg_increase_crit_damage").innerText = Math.round(crit_damage_damage - damage).toLocaleString();

    document.getElementById("dmg_ratio_hp_percentage").innerText = String(Math.round((hp_percentage_damage / damage - 1) * 10000)/100) + "%";
    document.getElementById("dmg_ratio_hp_flat").innerText = String(Math.round((hp_flat_damage / damage - 1) * 10000)/100) + "%";
    document.getElementById("dmg_ratio_attack_percentage").innerText = String(Math.round((attack_percentage_damage / damage - 1) * 10000)/100) + "%";
    document.getElementById("dmg_ratio_attack_flat").innerText = String(Math.round((attack_flat_damage / damage - 1) * 10000)/100) + "%";
    document.getElementById("dmg_ratio_em").innerText = String(Math.round((em_damage / damage - 1) * 10000)/100) + "%";
    document.getElementById("dmg_ratio_crit_damage").innerText = String(Math.round((crit_damage_damage / damage - 1) * 10000)/100) + "%";
}
calculate_delta_damage();

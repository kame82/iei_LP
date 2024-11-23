// wow
new WOW().init();

// swiper_js
const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
  autoplay: true, //オートプレイON
  speed: 1000, // スライド移動速度(デフォルトは300)
  slidesPerGroupAuto: true, // 矢印をクリックしても自動再生を止めない

  // autoplay parameters
  autoplay: {
    delay: 3000, // ms秒後に次のスライドへ
    disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  // Navigation arrows
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // },
});

// drawer menu

$(".drawer-menu__var").on("click", function (e) {
  var drawerClass = $(".drawer-menu__var .drawer-content, .header__bkg, .header__inner, .drawer-background, body, [class^='drawer-menu']");
  e.preventDefault(); // aタグ無効化
  $(this).toggleClass("is-active");
  $(drawerClass).toggleClass("is-active");

  $(window).on("resize", function () {
    var winW = $(window).width();
    var devW = 767;
    if (winW <= devW) {
      //767px以下の時の処理
      $(drawerClass).removeClass("is-active");
    } else if ($(drawerClass).hasClass("is-active")) {
      $(drawerClass).addClass("is-active");
    }
  });
  return false;
});

//スムーススクロール
$("a[href^='#']").on("click", function () {
  var header = $(".drawer").innerHeight(); //固定ヘッダーの高さを取得
  var id = $(this).attr("href"); //クリックした要素のhref_idを取得
  var position = 0; //初期値を0とする。（スクロールトップid=#の場合を定義）
  var drawerClass = $(".drawer-menu__var .drawer-content, .header__bkg, .header__inner, .drawer-background, body, [class^='drawer-menu']");

  if (id != "#") {
    //id=#以外のときに以下の処理を実行、id=#は0位置へ移動
    var winW = $(window).width();
    var devW = 767;
    if (winW <= devW) {
      //767px以下の時の処理
      var position = $(id).offset().top - header; //idの上部位置 - headerを取得 上部
      $(drawerClass).removeClass("is-active");
    } else {
      //768pxより大きい時の処理
      var position = $(id).offset().top; //idの上部位置を取得 上部
    }
  }

  $("html,body").animate(
    {
      scrollTop: position,
    },
    300
  );
});

$(function () {
  const pageTop = $("#page-top");
  pageTop.hide(); // 最初はボタンを非表示にする
  $(window).scroll(function () {
    if ($(this).scrollTop() > 833) {
      // 80pxスクロールしたら表示
      pageTop.fadeIn(300); // 80px以上スクロールしたら300ミリ秒かけてボタンをフェードイン
    } else {
      pageTop.fadeOut(); // 80px以下になったらボタンをフェードアウト
    }
  });
  pageTop.click(function () {
    $("body,html").animate(
      {
        scrollTop: 0, // 上から0pxの位置に戻る
      },
      500 // 500ミリ秒かけて戻る
    );
    return false;
  });
});

/* ===============================================
# modal
=============================================== */

const modalBtns = document.querySelectorAll(".modal-toggle");
modalBtns.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.getAttribute("data-modal");
    document.getElementById(modal).style.display = "block";
    $("body").toggleClass("is-active");
  };
});
const closeBtns = document.querySelectorAll(".modal-close");
closeBtns.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.closest(".modal");

    modal.style.display = "none";
  };
});
// .menu__modal__button クリック時にもモーダルを非表示にする
const menuModalBtns = document.querySelectorAll(".menu__modal__button");
menuModalBtns.forEach(function (btn) {
  btn.onclick = function () {
    var modal = btn.closest(".modal");
    $("body").toggleClass("is-active");
    modal.style.display = "none";
  };
});

window.onclick = function (event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
};

//予約日の日にちを取得（アクセスした日〜5日後まで）
//要素取得
const datelist = document.getElementById("date");

//表示終了日
const end = 5;
//日本の曜日
const week = ["日", "月", "火", "水", "木", "金", "土"];
if (end !== undefined) {
  for (let i = 0; i < end; i++) {
    //取得する日付の値を設定
    let param = Date.now() + i * 86400000;
    //値から日付を取得
    let date = new Date(param);

    //dateから年を取得
    let y = date.getFullYear();
    //dateから月を取得
    let m = date.getMonth() + 1;
    //dateから日を取得
    let d = date.getDate();
    //dateから曜日を取得
    let w = date.getDay();

    //月を2桁に揃える
    if (m < 10) {
      m = "0" + m;
    }
    //日を2桁に揃える
    if (d < 10) {
      d = "0" + d;
    }

    //テキストの出力形式
    let textFormat = y + "." + m + "." + d + "(" + week[w] + ")";
    //値の出力形式
    let valueFormat = y + "-" + m + "-" + d;

    //option要素を作成
    let option = document.createElement("option");
    //optionのテキストを指定
    option.textContent = textFormat;
    //optionの値を指定
    option.value = valueFormat;
    //detelistの末尾に追加
    datelist.appendChild(option);
  }
}

//セレクトボックス
$(".custom-select").each(function () {
  var classes = $(this).attr("class"),
    id = $(this).attr("id"),
    name = $(this).attr("name");
  var template = '<div class="' + classes + '">';
  template += '<span class="custom-select-trigger">' + $(this).attr("placeholder") + "</span>";
  template += '<div class="custom-options">';
  $(this)
    .find("option")
    .each(function () {
      template += '<span class="custom-option ' + $(this).attr("class") + '" data-value="' + $(this).attr("value") + '">' + $(this).html() + "</span>";
    });
  template += "</div></div>";

  $(this).wrap('<div class="custom-select-wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});

$(".custom-option:first-of-type").hover(
  function () {
    $(this).parents(".custom-options").addClass("option-hover");
  },
  function () {
    $(this).parents(".custom-options").removeClass("option-hover");
  }
);
$(".custom-select-trigger").on("click", function () {
  $("html").one("click", function () {
    $(".custom-select").removeClass("opened");
  });
  $(this).parents(".custom-select").toggleClass("opened");
  event.stopPropagation();
});
$(".custom-option").on("click", function () {
  $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
  $(this).parents(".custom-options").find(".custom-option").removeClass("selection");
  $(this).addClass("selection");
  $(this).parents(".custom-select").removeClass("opened");
  $(this).parents(".custom-select").find(".custom-select-trigger").text($(this).text());
});

// $(".custom-select-trigger").on("change", function () {
//   var selectedTime = $("#time").val();
//   // var submitButton = $("#submitButton");
//   if (selectedTime >= "17:30") {
//     alert("aaa");
//     // $("#submitButton").prop("disabled", false);
//   } else {
//     alert("bbbb");
//     // $("#submitButton").prop("disabled", true);
//   }
//   return false;
// });

// $(document).ready(function () {
//   // フォームが送信される前に実行されるイベント
//   $("#submitButton").click(function () {
//     // セレクトボックスの値を取得
//     var selectedTime = $("#time").val();

//     // 選択された時間が空でないことを確認
//     if (selectedTime === "") {
//       alert("時間を選択してください。");
//       return false; // フォームの送信を中止
//     }

//     // 他のバリデーションルールがあればここに追加

//     // フォームの送信を続行
//     return true;
//   });
// });

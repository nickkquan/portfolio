$(document).ready(init);

function init() {
  email();
  phone();
  closeNav();
  $(".mfp-image").click(portfolioClick);
}
function email() {
  var e = "nick";
  e += "quan";
  e += ".dev";
  e += "@";
  e += "gmail.com";
  $(".email").text(e);
  e = "mailto:" + e;
  $(".email ").attr("href", e);
}
function phone() {
  var p = "909";
  p += "-305";
  p += "-3030";
  $(".phone").text(p);
}
function closeNav() {
  $(document).click(function(event) {
    var clickover = $(event.target);
    var hamburger = $(".mobile-nav");
    var opened = hamburger.hasClass("active");
    var ul = $(".scroll-nav");
    if (opened === true && !clickover.hasClass("clearlist") && !clickover.hasClass("fa-bars")) {
      $(".mobile-nav").click();
    }
  });
}
function portfolioClick() {
  var workItem = $(this).parent();
  $(workItem)
    .find("img")
    .toggleClass("imgClick");
  $(workItem)
    .find(".work-intro, .work-title, .work-descr")
    .toggleClass("clickColor");
  $(workItem)
    .find(".work-img")
    .toggleClass("clickWorkImg");
  $(workItem)
    .find(".work-intro")
    .toggleClass("clickWorkIntro");
  $(workItem)
    .find(".work-intro")
    .toggleClass("removeOpacity", "addOrRemove");
}

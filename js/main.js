const search_element = document.querySelector('.search');
const search_input = search_element.querySelector('input'); /* search_element 중의 input을 찾음 */

search_element.addEventListener('click', function () {
    search_input.focus();
});

search_input.addEventListener('focus', function() {
    search_element.classList.add('focused');
    search_input.setAttribute('placeholder', '통합검색'); /* 기본적으로 입력되어있는 상태 */
});

search_input.addEventListener('blur', function() {
    search_element.classList.remove('focused');
    search_input.setAttribute('placeholder', ''); /* focus 해제 시 다시 지워주는 것 */
});

// 스크롤에 따라 나타나고 사라질 요소 지정
const badge_element = document.querySelector('header .badges');
const to_top_el = document.querySelector('#to_top');

/* window : 브라우저가 가지는 명령*/
window.addEventListener('scroll', _.throttle( function () {
    /*throttle : 일정 시간마다 한번씩 실행시켜서 부하 방지하는 기능*/
    /*숫자는 ms 단위*/
    console.log(window.scrollY);
    if (window.scrollY > 500) {
        // 배지를 숨기기
        // to top 버튼이 나타나는 스크립트
        // gsap.to(요소, 지속시간(s 단위), 옵션)
        gsap.to(badge_element, .6, {
            opacity: 0,
            display: 'none'
        })
        gsap.to(to_top_el, .2, {
            x: -100
        });
    } else {
        // 배지 보이기
        // to top 버튼이 숨기는 스크립트
        gsap.to(badge_element, .6, {
            opacity: 1,
            display: 'block'
        });
        gsap.to(to_top_el, .2, {
            x: 100
        })
    }
}, 300));

//gsap의 ScrollTo 플러그인 필요

to_top_el.addEventListener('click', function () {
    gsap.to(window, .7, {
        scrollTo : 0
    });
})

const fade_elements = document.querySelectorAll('.visual .fade-in');
fade_elements.forEach(function (fade_element, index) {
    // gsap.to(요소, 지속시간(s 단위), 옵션)
    gsap.to(fade_element, .6, {
        delay: (index + 1) * .7, // 각 인덱스에 있는 요소가 시작 시간은 동시라서 순차적으로 나타내려면 index를 곱해야함!
                                // 0.7, 1.4, 2.1, 2.7 초 뒤에 각각!
        opacity: 1
    });
});



// new Swiper('선택자', {옵션})
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical', // 재생 방향
    autoplay: true, // 자동재생
    loop: true // 반복재생
}); // 클래스 생성자, 자스 문법으로 함수를 실행한다.

new Swiper('.promotion .swiper-container', {
    direction: 'horizontal', // 재생 방향
    slidesPerView: 3, // 한번에 보일 슬라이드 수
    spaceBetween: 10, // 슬라이드 사이 여백 (픽셀)
    centeredSlides: true,
    loop: true, // 반복재생
    autoplay: {
        delay:5000,
    },
    pagination: {
        el:'.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true,  // 클릭이 가능한지?
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next',
    }
});


// Awards의 스와이퍼

new Swiper('.awards .swiper-container', {
    direction: 'horizontal',
    autoplay: true,
    loop: true,
    spaceBetween: 30,
    slidesPerView: 5,
    navigation: {
        prevEl: '.awards .swiper-prev',
        nextEl: '.awards .swiper-next',
    }
})

const promotion_element = document.querySelector('.promotion');
const promotion_toggle_button = document.querySelector('.toggle-promotion');

let is_promotion_hidden = false;

let promotion_change = function () {
    let toggle_button_up_down = document.querySelector('.toggle-promotion .material-icons') // 상태별 버튼의 방향을 바꾸기 위함.
    is_promotion_hidden = !is_promotion_hidden;
    // 값이 반대가 되게 해라, 즉 지금 상태에선 False에서 True로 바꾸어라.
    if (is_promotion_hidden) {
        // true : 숨김 처리
        promotion_element.classList.add('hide');
        promotion_toggle_button.classList.add('.hide');
        toggle_button_up_down.innerHTML='upload';
    } else {
        // false : 숨김 해제
        promotion_element.classList.remove('hide');
        promotion_toggle_button.classList.remove('.hide');
        toggle_button_up_down.innerHTML='download';
    }
};


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
    // `.toFixed()`를 통해 반환된 문자 데이터를,
    // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
  }
function floating_object(selector, delay, size) {
    //gsap.to(요소, 시간, 옵션)
    gsap.to(selector, random(1.5, 2.5), { // random에서 실행한 함수로 반환 된 값으로 실행.
        // 옵션
        y: 20,
        repeat: -1, // -1 : 무한반복
        yoyo: true, // 내려갔다가 올라갔다가 하는 옵션
        ease: Power1.easeInOut, // 부드럽게 시작 부드럽게 종료를 해주는 옵션. https://greensock.com/docs/v2/Easing
        delay: random(0, 1.5), // 애니메이션 동작 시간
    })
}

floating_object('.floating1', 1, 15);
floating_object('.floating2', .5, 15);
floating_object('.floating3', 1.5, 20);

//스크롤 애니메이션

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
    new ScrollMagic
      .Scene({
          triggerElement: spyEl, // 보여짐 여부를 감시할 요소 지정.
          triggerHook: .8, // 뷰포트 기준으로 유효 지점 판단 0.5가 중간지점. 맨 위가 0, 맨 밑이 1. 그래서 0.8은 위에서 밑으로 80%
      })
      .setClassToggle(spyEl, 'show') // 조건을 만족하면 show라는 클래스를 추가하고 삭제함.
      .addTo(new ScrollMagic.Controller()); // 특정요소 감시메소드, 화면에 보이나 안보이나 감지함.
      // 이렇게 메소드를 연달아 쓰는 것을 메소드체이닝이라고하는데 가독성을 높이기 위해 줄을 바꿈.

});


// 현재 몇년도인지 자동으로 계산하는 코드

const this_year = document.querySelector('.this-year');

this_year.textContent = new Date().getFullYear();
// 올해는 2022라는 숫자가 출력 될 것임.
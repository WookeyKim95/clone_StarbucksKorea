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

const badge_element = document.querySelector('header .badges');

/* window : 브라우저가 가지는 명령*/
window.addEventListener('scroll', _.throttle( function () {
    /*throttle : 일정 시간마다 한번씩 실행시켜서 부하 방지하는 기능*/
    /*숫자는 ms 단위*/
    console.log(window.scrollY);
    if (window.scrollY > 500) {
        // 배지를 숨기기
        // gsap.to(요소, 지속시간(s 단위), 옵션)
        gsap.to(badge_element, .6, {
            opacity: 0,
            display: 'none'
        });
    } else {
        // 배지 보이기
        gsap.to(badge_element, .6, {
            opacity: 1,
            display: 'block'
        });
    }
}, 300));

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


const promotion_element = document.querySelector('.promotion');
const promotion_toggle_button = document.querySelector('.toggle-promotion');

let is_promotion_hidden = false;

let promotion_change = function () {
    is_promotion_hidden = !is_promotion_hidden;
    // 값이 반대가 되게 해라, 즉 지금 상태에선 False에서 True로 바꾸어라.
    if (is_promotion_hidden) {
        // true : 숨김 처리
        promotion_element.classList.add('hide');
    } else {
        // false : 숨김 해제
        promotion_element.classList.remove('hide');
    }
};
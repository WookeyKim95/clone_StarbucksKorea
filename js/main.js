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
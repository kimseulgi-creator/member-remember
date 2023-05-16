$(document).ready(function () {
  listing();
});

function listing() {
  fetch('/intro')
    .then((res) => res.json())
    .then((data) => {
      let rows = data['result'];
      $('#cards-box').empty();
      rows.forEach((a) => {
        let image = a['image'];
        let name = a['name'];
        let mbti = a['mbti'];
        let blog = a['blog'];

        let temp_html = `<div class="col"><a href=""><img src="${image}" alt=""></a></div>`;
        $('#cards-box').append(temp_html);
      });
    });
}

//웹에서 포스팅 부분(쓰기)
function posting() {
  let url = $('#url').val();
  let name = $('#name').val();
  let mbti = $('#mbti').val();
  let blog = $('#blog').val();

  let formData = new FormData();
  formData.append('url_give', url);
  formData.append('name_give', name);
  formData.append('mbti_give', mbti);
  formData.append('blog_give', blog);

  fetch('/intro', { method: 'POST', body: formData })
    .then((res) => res.json())
    .then((data) => {
      alert(data['msg']);
      window.location.reload();
    });
}

function open_box() {
  $('#open_form').toggleClass("open_post")
}

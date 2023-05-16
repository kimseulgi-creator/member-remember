$(document).ready(function () {
  listing();
});

function listing() {
  fetch('/intro')
    .then((res) => res.json())
    .then((data) => {
      let rows = data['result'];
      $('#cards-box').empty();

      let n = 0;

      rows.forEach((a) => {
        let image = a['image'];
        let name = a['name'];
        let mbti = a['mbti'];
        let blog = a['blog'];

        n++;

        let temp_html = `
        <div class="col">
          <a role="button" onclick="open_modal('${name}+${n - 1}')">
           <img src="${image}" alt="">
          </a>

        </div>
        <div class="introduce">
        <button onclick="close_modal()">x</button>
        <div class="wrap">
          <img src="${image}" alt="">
          <div class="contents">
            <div>
              <h3>Name</h3>
              <p>${name}</p>
            </div>
            <div>
              <h3>MBTI</h3>
              <p>${mbti}</p>
            </div>
            <div>
              <h3>Blog</h3>
              <p>${blog}</p>
            </div>
          </div>
          <div id="comment">
            <div class="comment_input">
              <h3>Comment</h3>
              <div>
                <input class="name_input" for="" placeholder="Name"></input>
                <input class="comment_input" for="" placeholder="Comment"></input>
                <button>작성</button>
              </div>
            </div>
            <div id="comments">
            </div>
          </div>
        </div>
      </div>`;
        $('#cards-box').append(temp_html);
      });

      $("#cards-box .introduce").hide();
    });
}


let introduce_hide = document.getElementsByClassName('introduce')
console.log(introduce_hide)

function open_modal(name) {
  let str = name.split('+')
  let str_end = str[1]
  let el = document.getElementsByClassName('introduce')[str_end];
  $(el).show();
}

function close_modal() {
  $("#cards-box .introduce").hide();
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

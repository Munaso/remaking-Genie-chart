function get_songs() {
    $('#post-box').empty()
    $.ajax({
        type: 'GET',
        url: '/start',
        data: {},
        success: function (response) {
            let songs = response['songs']
            console.log(songs)
            songs.forEach((song)=>{
                let rank = song['rank']
                let title = song['title']
                let artist = song['artist']
                let class_heart = song['heart_by_me'] ? "fa-heart" : "fa-heart-o"


                let temp_html = `<div class="song" id="${rank}">
                                    <td>${rank}</td>
                                    <td>&nbsp;&nbsp; ${title}</td>
                                    <td>&nbsp;&nbsp;&nbsp;${artist}</td>  
                                    <a class="level-item is-sparta" aria-label="heart" onclick="toggle_like222('${rank}', 'heart')">
                                    <span class="icon is-small">
                                        <i class="fa ${class_heart}" aria-hidden="true"></i>  
                                    </span>&nbsp;
                                    <span class="like-num">${num2str(song['count_heart'])}</span>
                                    </a>
                                </div>`
                $('#post-box').append(temp_html)
            })  
        }
    });
}

function toggle_like222(rank, type) {
    console.log(rank, type)
    let $a_like = $(`#${rank} a[aria-label  ='${type}']`)
    console.log($a_like);

    let $i_like = $a_like.find("i")
    let class_s = {"heart":"fa-heart"}
    let class_o = {"heart":"fa-heart-o" }

    if ($i_like.hasClass(class_s[type])) {
        $.ajax({
            type: "POST",
            url: "/update_like222",
            data: {
                rank_give: rank,
                type_give: type,
                action_give: "unlike"
            },
            async: false,
            success: function (response) {
                $i_like.addClass(class_o[type]).removeClass(class_s[type])
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "/update_like222",
            data: {
                rank_give: rank,
                type_give: type,
                action_give: "like"
            },
            async: false,

            success: function (response) {
                $i_like.addClass(class_s[type]).removeClass(class_o[type])
                $a_like.find("span.like-num").text(num2str(response["count"]))
            }
        })

    }
}

function num2str(count) {
    if (count > 10000) {
        return parseInt(count / 1000) + "k"
    }
    if (count > 500) {
        return parseInt(count / 100) / 10 + "k"
    }
    if (count == 0) {
        return ""
    }
    return count
}

function sign_out() {
    $.removeCookie('mytoken', {path: '/'});
    alert('로그아웃!')
    window.location.href = "/login"
}







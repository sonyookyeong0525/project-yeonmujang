$(function(){

    //menu 열리는 이벤트
    $(".nav_btn").click(function(){
        $(".side_nav_wrap").addClass("open");
    });

    $(".nav_closebtn").click(function(){
        $(".side_nav_wrap").removeClass("open");
    });

    //검색창 열리는 이벤트
    let S_btn = $(".search_btn").find("i"),
        S_page = $(".search_wrap");

    S_btn.click(function(){
        S_page.css("display","block");
    });

    $(".search_closebtn").click(function(){
        S_page.css("display","none");
    })


    // 메인 슬라이드 이벤트
    let a=0,
        L_Btn = $(".slide_btn").find("li").eq(0),
        R_Btn = $(".slide_btn").find("li").eq(1);

    // setInterval(function(){
    //     a++
    //     a=a%5

    //     $(".slide_wrap").find("li").fadeOut(500);
    //     $(".slide_wrap").find("li").eq(a).fadeIn(500);

    //     $(".slide_pagebtn").find("li").removeClass("on");
    //     $(".slide_pagebtn").find("li").eq(a).addClass("on");

    // },5500) // 자동으로 돌아가는거랑 버튼 눌러서 돌아가는게 겹치면서 중간에 몇개 넘어가져서 빼고
        // 나중에 cleartimeout을 공부해서 작업 해보기

    R_Btn.click(function(){

        a++
        a=a%5

        $(".slide_wrap").find("li").fadeOut(500);
        $(".slide_wrap").find("li").eq(a).fadeIn(500);
        $(".slide_pagebtn").find("li").removeClass("on");
        $(".slide_pagebtn").find("li").eq(a).addClass("on");
    })

    L_Btn.click(function(){

        a--
        a=a%5

        $(".slide_wrap").find("li").fadeOut(500);
        $(".slide_wrap").find("li").eq(a).fadeIn(500);
        $(".slide_pagebtn").find("li").removeClass("on");
        $(".slide_pagebtn").find("li").eq(a).addClass("on");
    })

    //New MENU

    let $new = $(".menu ul"),
        Left = $(".menu_sidebtn").find("li").eq(0),
        Right = $(".menu_sidebtn").find("li").eq(1),
        $btn = $(".menu_pagebtn").find("li"),
        AA = 0;

    Right.click(function(){
        AA++

        Left.css("display","block");

        $new.animate({"left":-375*AA+"px"},1000,'linear');
        $btn.removeClass("active");
        $btn.eq(AA).addClass("active");

        if(AA==5){
                Right.css("display","none");
        }
    });

    Left.click(function(){
        AA--

        Right.css("display","block");

        $new.animate({"left":-375*AA+"px"},1000,'linear');
        $btn.removeClass("active");
        $btn.eq(AA).addClass("active");

        if(AA==0){
                Left.css("display","none");
        }
    });
    
    let Tab_btn = $(".alcohol_tab").find("li"),
        Tab_con = $(".alcohol").find(".tab"),
        Prev = $(".list_sidebtn").find("li").eq(0),
        Next = $(".list_sidebtn").find("li").eq(1),
        activeTab = 0,
        b = 0;

    // 탭별 슬라이드 설정 (maxB: 최대 슬라이드 횟수, barWidth: 초기/단위 바 너비)
    const tabConfig = [
        { maxB: 1, barWidth: 740 },  // HIGHBALL: 5개, 2페이지
        { maxB: 2, barWidth: 494 },  // BEER: 6개, 3페이지
        { maxB: 7, barWidth: 185 },  // WINE: 11개, 8페이지
        { maxB: 2, barWidth: 494 }   // WHISKEY: 6개, 3페이지
    ];

    // 탭 이벤트
    Tab_btn.each(function(i) {
        $(this).click(function() {
            if ($(this).hasClass("pop")) return;

            activeTab = i;
            b = 0;

            Tab_con.css("display", "none");
            Tab_con.eq(i).css("display", "block");
            Tab_btn.removeClass("pop");
            $(this).addClass("pop");

            Tab_con.eq(i).find(".tab_product ul").css("left", "0");
            Tab_con.eq(i).find(".bar").css("width", tabConfig[i].barWidth + "px");

            Prev.css("display", "none");
            Next.css("display", tabConfig[i].maxB > 0 ? "block" : "none");
        });
    });

    // Next 버튼 (이벤트 누적 방지: 탭 핸들러 밖에서 한 번만 등록)
    Next.click(function() {
        const config = tabConfig[activeTab];
        if (b >= config.maxB) return;

        b++;
        Prev.css("display", "block");

        Tab_con.eq(activeTab).find(".tab_product ul").animate({"left": -375 * b + "px"}, 1000, 'linear');
        Tab_con.eq(activeTab).find(".bar").animate({"width": config.barWidth * (b + 1) + "px"}, 1000, 'linear');

        if (b === config.maxB) {
            Next.css("display", "none");
        }
    });

    // Prev 버튼
    Prev.click(function() {
        if (b <= 0) return;

        const config = tabConfig[activeTab];
        b--;

        Next.css("display", "block");

        Tab_con.eq(activeTab).find(".tab_product ul").animate({"left": -375 * b + "px"}, 1000, 'linear');
        Tab_con.eq(activeTab).find(".bar").animate({"width": config.barWidth * (b + 1) + "px"}, 1000, 'linear');

        if (b === 0) {
            Prev.css("display", "none");
        }
    });

    //텝 끝..

    let Focus = $(".s_list"),
        S_Next = $(".list_sidebtn2").find("li").eq(1),
        S_Prev = $(".list_sidebtn2").find("li").eq(0),
        S_Focus = 0;

    // 매장 소개 슬라이드 (3개 순환: center / left / right)
    function updateSpaces() {
        const leftIdx  = (S_Focus + 1) % 3;
        const rightIdx = (S_Focus + 2) % 3;

        Focus.removeClass("focus focus_left focus_right");
        Focus.eq(S_Focus).addClass("focus");
        Focus.eq(leftIdx).addClass("focus_left");
        Focus.eq(rightIdx).addClass("focus_right");
    }

    S_Next.click(function() {
        S_Focus = (S_Focus + 1) % 3;
        updateSpaces();
    });

    S_Prev.click(function() {
        S_Focus = (S_Focus + 2) % 3;
        updateSpaces();
    });

    // top / bottom
    $(".top").click(function() {
        $('html, body').animate({scrollTop : 0},1500,'linear');
    });

    $(".bottom").click(function() {
        $('html, body').animate({scrollTop : $(document).height()},1500,'linear');
     });
})
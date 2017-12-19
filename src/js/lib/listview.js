var lv = {};

(function(obj) {
    var scroller = document.getElementById('scroller'),
        dropDownText = document.getElementById('dropDownRefreshText'),
        loadMore = document.getElementById('loadMore'),
        nomore = document.getElementById('nomore'),
        content = document.getElementById('content'),
        arrow = document.getElementById('arrow'),
        loading = document.getElementById('loading'),
        XLJZ = '下拉加载',
        SKJZ = '松开加载',
        JZ = '加载中...',
        JZGD = '加载更多',
        JZZ = '加载中...',
        dropDownRefreshText = XLJZ,//下拉刷新状态
        dragValve = 50, // 下拉加载阀值
        dragLoading = false,//是否正在下拉刷新
        scrollerLoading = false,//是否正在上拉加载
        translate = 0;//移动的距离

    //减少页面回流
    var arrowStyle = arrow.style,
        loadingStyle = loading.style,
        dropDownTextStyle = dropDownText.style;

    //利用transition 和 transform 改变位移
    var transformScroller = function (time, trans) {
        translate = trans;
        var elStyle = scroller.style;
        elStyle.webkitTransition = elStyle.MozTransition = elStyle.transition = 'all ' + time + 's ease-in-out';
        elStyle.webkitTransform = elStyle.MozTransform = elStyle.transform = 'translate3d(0, ' + translate + 'px, 0)';
    };

    //下拉刷新
    obj.initRefresh = function(onRefresh) {
        var isTouchStart = false;//是否已经触发下拉
        var isDragStart = false;//是否已经开始下拉
        var startX, startY;//下拉放心, touchstart的坐标
        var hasTouch = 'ontouchstart' in window;//判断是否在移动端上

        var touchStart = function(e) {
            arrowStyle.display = 'block';
            dropDownTextStyle.display = 'block';
            if (scroller.scrollTop <= 0) {
                isTouchStart = true;
                startY = hasTouch ? e.changedTouches[0].pageY : e.pageY;
                startX = hasTouch ? e.changedTouches[0].pageX : e.pageX;
            }
        };

        var touchMove = function(e) {

            if (!isTouchStart) return;
             var distanceY = (hasTouch ? e.changedTouches[0].pageY : e.pageY) - startY;
             var distanceX = (hasTouch ? e.changedTouches[0].pageX : e.pageX) - startX;
            //如果X方向上的位移大于Y方向，则认为是左右滑动
            if (Math.abs(distanceX) > Math.abs(distanceY))return;
            if (distanceY > 0) {
                e.preventDefault();
                translate = Math.pow((hasTouch ? e.changedTouches[0].pageY : e.pageY) - startY, 0.85)
            } else {
                if (translate !== 0) {
                    translate = 0;
                    transformScroller(0, translate);
                }
            }

            if (distanceY > 0) {
                if (!isDragStart) {
                    isDragStart = true;
                }
                if (translate <= dragValve) {// 下拉中，但还没到刷新阀值
                    if (dropDownRefreshText !== XLJZ)
                        dropDownText.innerHTML = (dropDownRefreshText = XLJZ);
                    arrow.classList.remove('arrow_up');
                } else { // 下拉中，已经达到刷新阀值
                    if (dropDownRefreshText !== SKJZ)
                        dropDownText.innerHTML = (dropDownRefreshText = SKJZ);
                        arrow.classList.add('arrow_up');
                }
                transformScroller(0, translate);
            }
        };

        var touchEnd = function(e) {
            isDragStart = false;
            if (!isTouchStart) return;
            isTouchStart = false;
            if (translate <= dragValve) {
                transformScroller(0.3, 0);
            } else {
                dragLoading = true;//设置在下拉刷新状态中
                transformScroller(0.1, dragValve);
                //更改加载中样式
                loadingStyle.display = 'block';
                arrowStyle.display = 'none';
                dropDownText.innerHTML = (dropDownRefreshText = JZ);
                onRefresh();//触发冲外面传进来的刷新回调函数
            }
            //解除touchmove

        };

        //监听下拉加载, 兼容pc
        scroller.addEventListener('touchstart', touchStart, false);
        scroller.addEventListener('touchmove', touchMove, false);
        scroller.addEventListener('touchend', touchEnd, false);
        scroller.addEventListener('mousedown', touchStart, false);
        scroller.addEventListener('mousemove', touchMove, false);
        scroller.addEventListener('mouseup', touchEnd, false);
    };
    //上拉加载
    obj.initScroll = function (onLoadMore) {

        //scroller.removeEventListener('touchmove',touchMove);
        var scrolling = function () {

            if (scrollerLoading || loadMore.style.display == 'none') return;

            var windowHeight = window.screen.height;
            var scrollerHeight = loadMore.getBoundingClientRect().top + 10;// 容器滚动可见高度

            if (scrollerHeight && scrollerHeight < windowHeight && content.offsetHeight >= windowHeight) {

                scrollerLoading = true;
                loadMore.innerHTML = JZZ;
                onLoadMore();
            }
        };

        scroller.addEventListener('scroll', scrolling, false);

    };
    //点击加载
    obj.clickLoad = function(onLoadMore) {
        loadMore.onclick = function() {
            scrollerLoading = true;
            loadMore.innerHTML = JZZ;
            onLoadMore();
        };
    };

    //刷新完毕
    obj.dragLoadingDone = function () {
        //刷新完毕后重新加载首页信息, 重置加载更多按钮
        nomore.style.display = 'none';
        loadMore.style.display = 'block';
        //刷新完毕,更改刷新状态
        loadingStyle.display = 'none';
        arrowStyle.display = 'none';
        dropDownTextStyle.display = 'none';
        transformScroller(0.3, 0);
        arrow.classList.remove('arrow_up');
        if (dropDownRefreshText !== XLJZ)
            dropDownText.innerHTML = (dropDownRefreshText = XLJZ);
    };

    //滚动完毕
    obj.scrollLoadingDone = function(hasMore) {
        scrollerLoading = false;
        loadMore.innerHTML = JZGD;
        if(!hasMore) {
            nomore.style.display = 'block';
            loadMore.style.display = 'none';
        }
    };
})(lv);

module.exports = lv;
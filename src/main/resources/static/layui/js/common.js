//举手
function upheads() {

    $.ajax({
        type: "post",
        url: "/insertevent",
        data:{"ztype":"举手"},
        success: function (data){
                if(data==1){
                    layer.msg("已举手，等待老师处理", { icon: 1, offset: "auto", time:1000 });
                }
              $("#upheads").css('background-color','#FFC000');
              $("#upheads").text('取消举手');
              $("#upheads").attr("onclick","removeup()");
        }
    });

}

//申请退出系统
function outsystem() {
    //alert(1)
    $.ajax({
        type: "post",
        url: "/outsystem",
        data:{"ztype":"退出系统"},
        success: function (data){
            if(data==1){
                layer.msg("已申请退出系统，等待老师处理", { icon: 1, offset: "auto", time:1000 });
            }
            $("#outsystem").css('background-color','#FFC000');
            $("#outsystem").text('取消申请');
            $("#outsystem").attr("onclick","removeout()");
        }
    });
}

function removeout() {
    $.ajax({
        type: "post",
        url: "/removeout",
        success: function (data){
            if(data!=0){
                layer.msg("已取消申请", { icon: 1, offset: "auto", time:1000 });
            }
            $("#outsystem").css('background-color','rgba(68,114,196)');
            $("#outsystem").text('退出系统');
            $("#outsystem").attr("onclick","outsystem()");
        }
    });
}



//判断字符串长度
function titleLength(str) {
    var strLength = 0;
    var list = str.split("");
    for (var i = 0; i < list.length; i++) {
            strLength = strLength + 1;
    }
    return strLength;
}

//去掉前面空格
function LTrim(str){
    var i;
    for(i=0;i<str.length;i++){
        if(str.charAt(i)!=" ")
            break;
    }
    str = str.substring(i,str.length);
    return str;
}

//去掉后面空格
function RTrim(str){
    var i;
    for(i=str.length-1;i>=0;i--){
        if(str.charAt(i)!=" ")
            break;
    }
    str = str.substring(0,i+1);
    return str;
}

//去掉前后空格
function Trim(str){
    return LTrim(RTrim(str));
}




//请假原因框
function showleave() {
    $("#co_leavemes").show();
    $("#leaveclass").css('background-color','#FFC000');
    $("#leaveclass").text('取消弹框');
    $("#leaveclass").attr("onclick","removeleave()");

}


/*function removeleave() {
    $("#co_leavemes").hide();
    $("#leaveclass").css('background-color','rgba(68,114,196)');
    $("#leaveclass").text('请假');
    $("#leaveclass").attr("onclick","showleave()");
}*/

//销假
function deleteleave() {
    $.ajax({
        type: 'post',
        url: '/deleteleave',
        success: function (data){
           // alert(data)
            if(data!=0){
                layer.msg("已销假", { icon: 1, offset: "auto", time:1000 });
                $("#leave").css('background-color','rgba(68,114,196)');
                $("#leave").attr("onclick","showleave()");
                $("#leave").text('请假');

            }
        }
    });
}


//请假
function common_leave(){
    var co_mes=$("#co_mes").val();
    //去空格
    co_mes=Trim(co_mes);

    //alert(co_mes)
    var length=titleLength(co_mes);

    //数据长度过长
    if (length>100){
        alert("请假原因过长");
    }
    //去空格后是否还有内容
    else if(!co_mes){
        alert("请填入请假原因");
    }else {
        $.ajax({
            type: 'post',
            url: '/insertevent',
            data:  {"ztype": "请假", "zcontent": co_mes} ,
            success: function (i){
                if(i==1){
                    layer.msg("已请假，等待老师审批", { icon: 1, offset: "auto", time:1000 });
                    $("#co_leavemes").hide();

                    $("#leave").css('background-color','#FFC000');
                    $("#leave").attr("onclick","deleteleave()");
                    $("#leave").text('销假');
                }
            }
        });
    }

}

function removeup() {
    $.ajax({
        type: "post",
        url: "/removeup",
        success: function (data){
            if(data==1){
                layer.msg("已取消举手", { icon: 1, offset: "auto", time:1000 });
            }
            $("#upheads").css('background-color','rgba(68,114,196)');
            $("#upheads").text('举手');
            $("#upheads").attr("onclick","upheads()");
        }
    });

}

function subContent() {
    var formData = new FormData();
    var zcontent =$("#textContent").val();
    var ztype=$("#valueSelect option:selected").val();
    formData.append("ztype",ztype );
    formData.append("zcontent", zcontent);
    $.ajax({
        type:"post",
        url:"/zrecord",
        data:formData,
        contentType: false,
        processData: false,
        async: false,
        success:function (success) {
        if(success==1){
            alert("提交成功");
        }else{
            alert("提交失败没有提交成功");
        }
        }
    })
}
//根据开始按钮或者是结束按钮来帅选签到的人
function OpenOrCloseTimer(a) {
    checkRenlian()
    if (a == 1) {
        var myDate = new Date();
        var mytime=myDate.getTime();
        timer = setInterval(function(){
            showRecognitionFace(mytime)
        }, 3000)
    }
    if (a == 2) {
        alert("进入到结束按钮中")
        clearInterval(timer);
        //timer=false;

    }
}

//从数据库中找出教室的所有设备
function showStudentStatus(){
    var str="";
    var center=$("#center");
    center.empty();
    $.ajax({
        type: "post",
        url: "/findfacilitybytrainingroom",
        success: function (data) {

            if(data.length <7){

                str+="<table class='t_table' id='p_bbox'>"
                str+=" <tr>";
                //var类型，不能写成int
                for(var i=0; i<data.length;i++){

                    str+="<th><button class='t_button1'onclick='diagram(\""+data[i].zid+"\")' >机床示意</button></th>";
                    str+="<div class='t_message' hidden align='center' id='t_message\""+data[i].zid+"\"'>";
                    str+=  "<button class='t_button2' id='button\""+data[i].zid+"\"'></button>";
                    str+= "<div class='t_id' align='center' id='machineNumber"+data[i].zid+"'><font size='3'></font></div>";
                    str+= "<div class='t_name' align='center' id='name"+data[i].zid+"'><font size='3'>当前人员：</font></div>";
                    str+=  "<div class='t_student' align='center'><font size='3'>电脑屏幕</font></div>";
                    str+= "<div class='t_computer' align='center'><font size='3'>摄像头</font></div>";
                    str+= "<input type='text' class='t_progress' id='progress"+data[i].zid+"' value='当前进度:'>";
                    str+= "<input type='text' class='t_staets' id='status"+data[i].zid+"' value='状态信息 :'>";
                    str+= "<button class='t_button3' onclick='closemessage(\""+data[i].zid+"\")'>关闭</button>";
                    str+=   "</div>";

                }
                str+="</tr>";
                str+="</table>";

            }else {
                var j=0;
                str+="<table class='t_table' id='p_bbox'>"

                for (var i=0;i<(data.length/8+1);i++){
                                /*传值uuid时js需要转换下\""+data[j].zid+"\"*/
                    str+=" <tr>";
                    for(;j<7*(i+1);j++){
                        if(j==data.length){break;}
                        str+="<th><button class='t_button1'onclick='diagram(\""+data[j].zid+"\")' >机床示意</button></th>";
                        str+="<div class='t_message' hidden align='center' id='t_message"+data[j].zid+"'>";
                        str+=  "<button class='t_button2' id='button"+data[j].zid+"'></button>";
                        str+= "<div class='t_id' align='center' id='machineNumber"+data[j].zid+"'><font size='3'></font></div>";
                        str+= "<div class='t_name' align='center' id='name"+data[j].zid+"'><font size='3'>当前人员：</font></div>";
                        str+=  "<div class='t_student' align='center'><font size='3'>电脑屏幕</font></div>";
                        str+= "<div class='t_computer' align='center'><font size='3'>摄像头</font></div>";
                        str+= "<input type='text' class='t_progress' id='progress"+data[j].zid+"' value='当前进度:'>";
                        str+= "<input type='text' class='t_staets' id='status"+data[j].zid+"' value='状态信息 :'>";
                        str+= "<button class='t_button3' onclick='closemessage(\""+data[j].zid+"\")'>关闭</button>";
                        str+=   "</div>";

                    }
                    str+="</tr>";
                }

                str+="</table>";
            }

            center.html(str)

        }
    });

}

//从数据库中找出举手的同学
function findRaiseHand(zid) {

    $.ajax({
        type: 'post',
        url: '/findRaiseHand',
        data:  {"zid": zid} ,
        success: function (data){
            if(data!=""){
                alert("举手还是请假 ："+data.ztype);
               // $("#button"+zid).css('background-color','rgba(237,125,49)');
                $("#status"+zid).val("状态信息："+data.ztype);

            }else{
                //查看电源是否打开
                findOpenPower(zid);

            }

        }
    });
}
//查看电源情况
function findOpenPower(zid){

    $.ajax({
        type: 'post',
        url: '/findOpenPower',
        data:  {"zid": zid} ,
        success: function (i){
            alert("电源ip: "+i);
            if(i!=""){
                $("#button"+zid).css('background-color','rgba(11,255,10)');
            }else{
                $("#button"+zid).css('background-color','rgba(128,128,128)');

            }

        }
    });

}
//查看使用该机床学生的姓名
function findStudentName(zid){
    var format
    $.ajax({
        type: 'post',
        url: '/findStudentName',
        data:  {"zid": zid} ,
        success: function (name){
            alert("name :"+name);
            if(name!=""){
                $("#name"+zid).empty();
                $("#name"+zid).append("当前人员："+name);
            }

        }
    });

}

//查看学生当前进度
function presentProgess(zid){
        alert("presentProgess"+zid);
    var formData = new FormData();
    formData.append("zid", zid);
    $.ajax({
        type: 'post',
        url: '/presentProgess',
        data:  formData ,
        contentType: false,
        processData: false,
        async: false,
        success: function (data){
            if(data==""){
                $("#progress"+zid).val("当前进度：正在进行测试");


            }else{
                if(data.zcontent==null){
                    $("#progress"+zid).val("当前进度：正在进行测试");
                }else{
                    $("#progress"+zid).val("当前进度："+data.zcontent);
                }

            }

        }
    });
}
//从数据库中显示已经检测到的人脸信息
//从数据中找到签到的学生
function showRecognitionFace(mytime) {
    var formData = new FormData();
    formData.append("mytime",mytime );
    $.ajax({
        type:"post",
        url:"/InspectSitStudent",
        data:formData,
        contentType: false,
        processData: false,
        async: false,
        success:function (data) {
            if(data!=null){
                if(data.length>5){
                    $("#identifyAreas").empty();
                    for(var i=0;i<5;i++){
                        content =" <div style='font-size: 20px;width: 80%;margin-top: 10px'>"+data[i].zstudentName+data[i].zgradeName+"</div>";
                        $("#identifyAreas").append(content);
                    }
                }else {
                    $("#identifyAreas").empty();
                    //alert("data :")
                    for(var i=0;i<data.length;i++){
                        content =" <div style='font-size: 20px;width: 80%;margin-top: 10px'>"+data[i].zstudentName+data[i].zgradeName+"</div>";
                        $("#identifyAreas").append(content);
                    }
                }

                 if(data.length==1){
                     $("#left").empty();
                     $("#middle").hide();
                     $("#right").hide();
                     var  zstudentName =data[0].zstudentName;
                     var  zgradeName =data[0].zgradeName;
                     $("#left").append(zgradeName+zstudentName);
                     //$("#mainBody").hide()
                 }
                 if(data.length==2){
                     $("#left").empty();
                     $("#middle").empty();
                     $("#right").hide();
                     var  zstudentName1 =data[0].zstudentName;
                     var  zgradeName1 =data[0].zgradeName;
                     $("#left").append(zgradeName1+zstudentName1);
                     var  zstudentName2 =data[1].zstudentName;
                     var  zgradeName2 =data[1].zgradeName;
                     $("#middle").append(zgradeName2+zstudentName2);
                     //$("#mainBody").hide();
                 }
                if(data.length==3){
                    $("#left").empty();
                    $("#middle").empty();
                    $("#right").empty();
                    var  zstudentName1 =data[0].zstudentName;
                    var  zgradeName1 =data[0].zgradeName;
                    $("#left").append(zgradeName1+zstudentName1);
                    var  zstudentName2 =data[1].zstudentName;
                    var  zgradeName2 =data[1].zgradeName;
                    $("#middle").append(zgradeName2+zstudentName2);
                    var  zstudentName3 =data[2].zstudentName;
                    var  zgradeName3 =data[2].zgradeName;
                    $("#right").append(zgradeName3+zstudentName3);
                    //$("#mainBody").hide();
                }
                 if(data.length>3){
                     $("#left").empty();
                     $("#middle").empty();
                     $("#right").empty();
                     var  zstudentName1 =data[0].zstudentName;
                     var  zgradeName1 =data[0].zgradeName;
                     $("#left").append(zgradeName1+zstudentName1);
                     var  zstudentName2 =data[1].zstudentName;
                     var  zgradeName2 =data[1].zgradeName;
                     $("#middle").append(zgradeName2+zstudentName2);
                     var  zstudentName3 =data[2].zstudentName;
                     var  zgradeName3 =data[2].zgradeName;
                     $("#right").append(zgradeName3+zstudentName3);
                     //$("#mainBody").hide();
                 }


             if(data.length>1){//不大于三个则显示现有的个数
                 var str="";
                 var center=$("#mainBody");
                 center.empty();
                 var j=0;
                 str+="<table class='f_table' id='p_bbox'>";
                 var arr=data.slice(1,data.length);
                 for (var i=0;i<(arr.length/4+1);i++) {

                     str += " <tr>";
                     for (; j < 4 * (i + 1); j++) {
                         if (j == arr.length) {break;}
                         str += "<th><div class='f_button1'>" + arr[j].zstudentName + arr[j].zgradeName + "</div></th>";

                     }

                 }
                 str += "</tr>";
                 str+="</table>";
                 center.html(str)
             }
            }else{
                alert("没有学生签到成功");
            }
        }
    })
}
//现场管理
function fieldManagement() {
    location.href="/teachRegister";
}
//信息查询
function informationService() {
    location.href="/information_service";
}
//实时状态
function timeStatus() {
    location.href="/time_status";
}
//信息发布
function informationDelivery() {
    location.href="/information_delivery";
}


function temporary_task() {

    window.location.href = "/temporary_task";
}

function fixed_task() {

    window.location.href = "/fixed_task";
}

function powerController() {

    window.location.href = "/power_controller";
}


//获取命令
function getcommand() {
    var rolling_barrage=$("#rolling_barrage");
   var chagangID =document.getElementById("chagangID").innerHTML;
    var gundongID =document.getElementById("gundongID").innerHTML;
    var formData = new FormData();
    formData.append("chagangID", chagangID);
    formData.append("gundongID", gundongID);
    var str="";

    //获取教师命令
    $.ajax({
        type: "post",
        url: "/findcommand",
        data: formData,
        contentType: false,
        processData: false,
        async: false,
        success: function (data){

            for(var i=0;i<data.length;i++){
                if(data[i].ztype=="查岗"){//data[i].ztype =="签到"||
                    document.getElementById("chagangID").innerHTML=data[i].zid;
                    getMedia2();

                }
                else if(data[i].ztype == "滚屏信息"){
                    str+=" <marquee><span style='font-weight: bolder;font-size: 40px;color: white;'><font size='7'>"+data[i].zcontent+"</font></span></marquee>"
                    rolling_barrage.html(str)
                    rolling_barrage.show()
                    document.getElementById("gundongID").innerHTML=data[i].zid;
                }
            }
            //location.href = "/student_test";
        }

    });

}
//在数据库中插入查岗信息
function insertCheckPoint(){
    var formData = new FormData();
    formData.append("ztype", "查岗");
    formData.append("zcontent", "查岗");
    $.ajax({
        type: "post",
        url: "/addCheckPoint",
        data:formData,
        contentType: false,
        processData: false,
        async: false,
        success: function (data){
        if(data!=1){
            alert("插入查岗失败")
        }

        }
    });
}
var mediaStreamTrack;

function getMedia2() {
    $("#regcoDiv").empty();
    let vedioComp = "<video id='video2' width='600px' height='400px' autoplay='autoplay' style='margin-top: 20px;z-index:1000;position:relative;left:90%;margin-top:20%' ></video><canvas id='canvas2' width='500px' height='500px' style='display: none'></canvas>";
    $("#regcoDiv").append(vedioComp);
    let constraints = {
        video: {width: 500, height: 500},
        audio: true
    };
    //获得video摄像头区域
    let video = document.getElementById("video2");
    //这里介绍新的方法，返回一个 Promise对象
    // 这个Promise对象返回成功后的回调函数带一个 MediaStream 对象作为其参数
    // then()是Promise对象里的方法
    // then()方法是异步执行，当then()前的方法执行完后再执行then()内部的程序
    // 避免数据没有获取到

    let promise = navigator.mediaDevices.getUserMedia(constraints);
    promise.then(function (stream) {
        mediaStreamTrack = typeof stream.stop === 'function' ? stream : stream.getTracks()[1];
        //video.src = (window.webkitURL).createObjectURL(stream);
        video.srcObject = stream;
        video.play()
    });
    window.setInterval(function () {//每隔几秒查询对比一次结果，循环对比
        chooseFileChangeComp()
    }, 5000);
    //chooseFileChangeComp()

}
function chooseFileChangeComp() {
    let regcoDivComp = $("#regcoDiv");
    if (regcoDivComp.has('video').length) {
        let video = document.getElementById("video2");
        let canvas = document.getElementById("canvas2");
        document.getElementById("hiddenArea").style.display="block";
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, 500, 500);
        var base64File = canvas.toDataURL();
        var formData = new FormData();
        formData.append("groupId", "101")
        formData.append("file", base64File);
        $.ajax({
            type: "post",
            url: "/faceFind",
            data: formData,
            contentType: false,
            processData: false,
            async: false,
            success: function (text) {
                var res = JSON.stringify(text)
                if (text.code == 0) {
                    var name = text.data.name;
                    $("#nameDiv").html("姓名：" + name);
                    var similar = text.data.similarValue;
                    $("#similarDiv").html("相似度：" + similar + "%");
                    var age = text.data.age;
                    $("#ageDiv").html("年龄：" + age);
                    var gender = text.data.gender;
                    $("#genderDiv").html("性别：" + gender);
                    document.getElementById("hiddenArea").style.display="none";
                    //关闭摄像头
                    mediaStreamTrack.stop();
                    $("#regcoDiv").empty();

                } else {
                    $("#nameDiv").html("");
                    $("#similarDiv").html("");
                    $("#ageDiv").html("");
                    $("#genderDiv").html("");
                    //自定义提示框
                    showTips("人脸不匹配");
                   // mediaStreamTrack.stop();
                    //location.href = "/student";
                }

            },
            error: function (error) {
                $("#nameDiv").html("");
                $("#similarDiv").html("");
                $("#ageDiv").html("");
                $("#genderDiv").html("");
                alert(JSON.stringify(error))
            }
        });
    }
}
function showTips(content) {
    //窗口的宽度
    height = 200;
    var windowWidth = $(window).width();
    var tipsDiv = '<div class="tipsClass">' + content + '</div>';
    $('body').append(tipsDiv);
    $('div.tipsClass').css({//(windowWidth / 2) - 350 / 2 + 'px'
        'top': height + 'px',
        'left':  '650px',
        'position': 'absolute',
        'padding': '3px 5px',
        'background': '#fff',
        'font-size': 20 + 'px',
        'margin': '0 auto',
        'text-align': 'center',
        'width': '350px',
        'height': 'auto',
        'color': '#fc2b2e',
        'opacity': '1.0',
        'z-index':'1000'
    }).show();
    setTimeout(function () {
        $('div.tipsClass').fadeOut();
    }, 2000);
}

function checkRenlian() {
        //send();
}
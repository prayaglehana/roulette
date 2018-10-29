var button;
var centreX=494;
var centreY=231;
var r=158;
var theta=in_rad(30);
var start=false;
var bet_no;
var wheel_sound;
var f_is_set;
var f;
inc=6;

w=550;
h=268;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    console.log('localhostconnect');
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}





var rouletteContract = web3.eth.contract ([{"constant":false,"inputs":[],"name":"claimReward","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"X","type":"uint8"}],"name":"get_number","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"registerMe","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"spin_wheel","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"bet_no","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"person1","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"person2","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"r","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"regTill","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"winRatio","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"}]);
//helo
var roulette = rouletteContract.at('0x96a71238fc9605eaecf117db26471dc24fc0c372');

web3.eth.defaultAccount=web3.eth.accounts[0]


function setup() {

createCanvas(1537,470);
//createCanvas(windowWidth,470);

img = loadImage("stock_imgs/roulette_table_3_f2.jpg");
//wheel_sound=loadSound('stock_imgs/audios/rouletteshound.mp3');


wheel=loadImage("stock_imgs/roulette_wheel.jpg");
imgMask= loadImage("stock_imgs/roulette_wheel_.png");



background(0);
f_is_set=false;

theta=in_rad(8);

}

function draw() {
    background(0);


    image(img, width/5, 0, img.width*1, img.height*1);




    bet_no=draw_rect_and_get_bet_no(2.22*width/5,96,w,h);
   
    
    
    draw_ellipse();
    if(start==true && f_is_set==true)
        {   console.log(inc);
            if(inc<0){start=false;
     //   wheel_sound.stop();
                  }
            
            theta=theta+in_rad(inc);
            
            inc=inc-(f);
            if(theta>=in_rad(360)){theta=0;}

    }

    //rect(mouseX,mouseY, 55, 55);
}

function get_acc(r){
    var b=0;
    
    if(r==0) b=35;
    else if(r==32)b=36;
    else if(r==15)b=0;
    else if(r==19)b=1;
    else if(r==4)b=2;
    else if(r==21)b=3;
    else if(r==2)b=4;
    else if(r==25)b=5;
    else if(r==17)b=6;
    else if(r==34)b=7;
    else if(r==6)b=8;
    else if(r==27)b=9;
    else if(r==13)b=10;
    else if(r==36)b=11;
    else if(r==11)b=12;
    else if(r==30)b=13;
    else if(r==8)b=14;
    else if(r==23)b=15;
    else if(r==10)b=16;
    else if(r==5)b=17;
    else if(r==24)b=18;
    else if(r==16)b=19;
    else if(r==33)b=20;
    else if(r==1)b=21;
    else if(r==20)b=22;
    else if(r==14)b=23;
    else if(r==31)b=24;
    else if(r==9)b=25;
    else if(r==22)b=26;
    else if(r==18)b=27;
    else if(r==29)b=28;
    else if(r==7)b=29;
    else if(r==28)b=30;
    else if(r==12)b=31;
    else if(r==35)b=32;
    else if(r==3)b=33;
    else if(r==26)b=34;


    var f=(b/1.2612049)+1/0.00599;
    console.log('b'+b+'r'+r);
    return 1/f;

}
function draw_ellipse(){
    push();
    translate(centreX,centreY)
    stroke(100);
    fill(255);
    ellipse(r*cos(theta),r*sin(theta),15,15);
    pop();
    }

function draw_rect_and_get_bet_no(ox,oy,w,h){
    sw=w/14;
    sh=h/5;
    if(mouseX>ox && mouseX<ox+w && mouseY>oy && mouseY <oy+h){
        mx=mouseX-ox;
        my=mouseY-oy;
        push();
        
        noFill();
        stroke(0);
        translate(ox,oy);
        // 1:1
                    //red
                    if(mx>5*sw && mx<7*sw && my>0 && my<sh){
                        rect(5*sw,0,2*sw,sh);
                        pop();
                        return 1;
                    }
                    //black
                    else if(mx>7*sw && mx<9*sw && my>0 && my<sh){
                        rect(7*sw,0,2*sw,sh);
                        pop();
                        return 2;

                    }
                    //even
                    else if(mx>3*sw && mx<5*sw && my>0 && my<sh){
                        rect(3*sw,0,2*sw,sh);
                        pop();
                        return 3;
                    
                    }
                    //odd
                    
                    else if(mx>9*sw && mx<11*sw && my>0 && my<sh){
                        rect(9*sw,0,2*sw,sh);
                        pop();
                        return 4;
                    }
                    //1 to 18
                    if((mx>sw && mx<3*sw && my>0 && my<sh) ){
                        rect(sw,0,2*sw,sh);
                        rect(sw,sh,6*sw,3*sh);
                        pop();
                        return 5;
                    }
                    //19 to 36
                    else if(mx>11*sw && mx<13*sw && my>0 && my<sh){
                        rect(11*sw,0,2*sw,sh);
                        rect(7*sw,sh,6*sw,3*sh);
                        pop();
                        return 6;
                    }

         //1:2      //1-12
                    else if(mx>sw && mx<5*sw && my>4*sh && my<5*sh){
                        rect(sw,4*sh,4*sw,sh);
                        pop();
                        return 7;
                    }
                    //13-24
                    else if(mx>5*sw && mx<9*sw && my>4*sh && my<5*sh){
                        rect(5*sw,4*sh,4*sw,sh);
                        pop();
                        return 8;
                    }
                    //25-36
                    else if(mx>9*sw && mx<13*sw && my>4*sh && my<5*sh){
                        rect(9*sw,4*sh,4*sw,sh);
                        pop();
                        return 9;
                    }
                       //3-36  1 row
                    else if(mx>13*sw && mx<14*sw && my>sh && my<2*sh){
                        
                        rect(13*sw,sh,sw,sh);
                        pop();
                        return 10;
                    }
                    // 2-35 2 row
                    else if(mx>13*sw && mx<14*sw && my>2*sh && my<3*sh){
                        rect(13*sw,2*sh,sw,sh);
                        pop();
                        return 11;
                    }
                    //1-34 3 row
                    else if(mx>13*sw && mx<14*sw && my>3*sh && my<4*sh){
                        rect(13*sw,3*sh,sw,sh);
                        pop();
                        return 12;
                        
                    }
                    
        //set of 6 numbers
                    //1,2,3,4,5,6
                    else if((mx>1.8*sw && mx<2.2*sw && my>0.8*sh && my<1.2*sh) || (mx>1.8*sw && mx<2.2*sw && my>3.8*sh && my<4.2*sh)){
                        rect(sw,0.8*sh,2*sw,0.5*sh);
                        rect(sw,sh,2*sw,3*sh);
                        pop();
                        return 13;
                      
                    }
                    //7,8,9,10,11,12
                    else if((mx>3.8*sw && mx<4.2*sw && my>0.8*sh && my<1.2*sh) || (mx>3.8*sw && mx<4.2*sw && my>3.8*sh && my<4.2*sh)){
                        rect(3*sw,0.8*sh,2*sw,0.5*sh);
                        rect(3*sw,sh,2*sw,3*sh);
                        pop();
                        return 14;
                    }
                    //13,14,15,16,17,18
                    else if((mx>5.8*sw && mx<6.2*sw && my>0.8*sh && my<1.2*sh) || (mx>5.8*sw && mx<6.2*sw && my>3.8*sh && my<4.2*sh)){
                        rect(5*sw,0.8*sh,2*sw,0.5*sh);
                        rect(5*sw,sh,2*sw,3*sh);
                        pop();
                        return 15;
                    }
                    //19,20,21,22,23,24
                    else if((mx>7.8*sw && mx<8.2*sw && my>0.8*sh && my<1.2*sh) || (mx>7.8*sw && mx<8.2*sw && my>3.8*sh && my<4.2*sh)){
                        rect(7*sw,0.8*sh,2*sw,0.5*sh);
                        rect(7*sw,sh,2*sw,3*sh);
                        pop();
                        return 16;
                    }
                    //25,26,27,28,29,30
                    else if((mx>9.8*sw && mx<10.2*sw && my>0.8*sh && my<1.2*sh) || (mx>9.8*sw && mx<10.2*sw && my>3.8*sh && my<4.2*sh)){
                        rect(9*sw,0.8*sh,2*sw,0.5*sh);
                        rect(9*sw,sh,2*sw,3*sh);
                        pop();
                        return 17;
                    }
                    //31,32,33,34,35,36
                    else if((mx>11.8*sw && mx<12.2*sw && my>0.8*sh && my<1.2*sh) || (mx>11.8*sw && mx<12.2*sw && my>3.8*sh && my<4.2*sh)){
                        rect(11*sw,0.8*sh,2*sw,0.5*sh);
                        rect(11*sw,sh,2*sw,3*sh);
                        pop();
                        return 18;
                    }
        //set of four numbers
                 //between 3 and 6 and 2 and 5
                 
                 for(var i=1;i<12;++i){

                        if(mx>(i+0.8)*sw && mx<(i+1.2)*sw && my>1.8*sh && my<2.2*sh){
                            rect((i+0.8)*sw,1.8*sh,0.4*sw,0.4*sh);
                            rect(i*sw,sh,2*sw,2*sh);
                            pop();
                            return i+18;
                        
                        }
                    }
                    
                //next (between 1 and 2 and 4 and 5)
                for(var i=1;i<12;++i){

                    if(mx>(i+0.8)*sw && mx<(i+1.2)*sw && my>2.8*sh && my<3.2*sh){
                        rect((i+0.8)*sw,2.8*sh,0.4*sw,0.4*sh);
                        rect(i*sw,2*sh,2*sw,2*sh);
                        pop();
                        return i+30;
                    
                    }
                }
        //set of three numbers
             //column 1: 1,2,3
              
                for(var i=1;i<=12;++i){
                    if(i%2==0) inc=0;
                    else
                     inc=0.2;
                    if((mx>(i+inc)*sw && mx<(i+inc+0.8)*sw && my>0.8*sh && my<1.2*sh) || (mx>(i+inc)*sw && mx<(i+inc+0.8)*sw && my>3.8*sh && my<4.2*sh)){
                        rect(i*sw,0.8*sh,sw,0.5*sh);
                        rect(i*sw,sh,sw,3*sh);
                        pop();
                        return i+42;
                  
                    }
                }
            
        
       //set of two numbers
                //between 3 and 2
                for(var i=1;i<=12;++i){
                    if(mx>i*sw && mx<(i+1)*sw && my>1.8*sh && my<2.2*sh){
                        rect(i*sw,1.8*sh,sw,0.4*sh);
                        rect(i*sw,sh,sw,2*sh);
                        pop();
                        return i+54;
                    }   
                }
                //between 1 and 2
                for(var i=1;i<=12;++i){
                    if(mx>i*sw && mx<(i+1)*sw && my>2.8*sh && my<3.2*sh){
                        rect(i*sw,2.8*sh,sw,0.4*sh);
                        rect(i*sw,2*sh,sw,2*sh);
                        pop();
                        return i+66;
                    }   
                }
                
      
        //one number

       //individual cells
       var inc_h=1;
       var i=1;
                for(var i_=1;i_<=36;++i_){
                    
                    if(i_%13==0){++inc_h;i=1;}
                    if(mx>i*sw && mx<(i+1)*sw && my>inc_h*sh && my<(inc_h+1)*sh){
                        rect(i*sw,inc_h*sh,sw,sh);
                        pop();
                        return i+78;
                    }
                    ++i;
                }
            
   

       

        //0
          if(mx>0 && mx<sw && my>sh && my<4*sh){
                    
                        rect(0,sh,sw,3*sh);
                        pop();
                        return 115;
                    }
     

        return 0;
        pop();
    }
    else{
        return -1;
    }
}



function in_rad(ang){
    return 3.14*ang/180;
}
$("#claimReward").click(function(){
    roulette.claimReward(function(error, result){
        if(!error)
            {   
                console.log('wheel has been spun') ;        
            }
        else
            console.error(error);
    });   
});
$("#regme").click(function(){
    console.log('you are being registered');
    roulette.registerMe({from: web3.eth.accounts[0], gas: 3000000, value: web3.toWei('1', 'ether')}, function(err, res){});
    console.log('you sent from'+web3.eth.accounts[0]+'to'+web3.eth.defaultAccount);
});
$("#start").click(function(){
    console.log('start is called');
    start=true;
    //wheel_sound.play();
    inc=5;
    roulette.spin_wheel(function(error, result){
        if(!error)
            {   
                console.log('wheel has been spun') ;        
            }
        else
            console.error(error);
    });   

    roulette.r.call(function(err, res){	
	 	if(!err){
                f=get_acc(res);
                f_is_set=true;
                $("#r_id").html('r'+str(res));
             }});
             
    roulette.winRatio.call(function(err, res){	
                if(!err){
                         console.log('win_ratio'+res);
                       $("#win_ratio").html('win ratio'+str(res));
                 
                    }});
    
});

function mousePressed() {
    if (bet_no>0) {
      console.log(bet_no);
      roulette.get_number(bet_no,function(err,res){
          if(!error){
              console.log('bet has been set');
          }
          else
            console.error('error');
      }); 
    } else {
      console.log(bet_no);
    }
  }
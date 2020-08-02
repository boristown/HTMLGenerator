
var g_market_name = "";
var g_startdate = null;
var g_data_tabs = null;
var g_data_dict = null;

window.onload = marketTableAdjust;
window.onorientationchange = marketOrientationChange;
window.onresize = marketOrientationChange;

let canvasH = 600; //�����߶�
let canvasW = 600; //�������
let mouseDis = 50; //������
let longwidth = 1000;
let shortwidth = 500;
let buyStyle = 'rgba(200, 70, 50, 1)';
let sellStyle = 'rgba(50, 200, 80, 1)';
let bartextStyle = 'rgb(20, 20, 20, 1)';

var vue_app = new Vue({
el: '#vue_app',
    delimiters: ['{[', ']}'],
    data: {
donatehtml: null,
        market_type: null,
        market_type_ref: null,
        market_name: null,
        market_prediction: null,
        localtime: null,
        tableitems: [],
        startdate: null,
        pagetotal: 1,
        pageindex: 1,
        pagesize: 100,
        isPC: true,
        AISystemSwitcherClass: "selected",
        TurtleSystemSwitcherClass: "unselected",
    },
    updated() {

},
    mounted() {
this.callApi();
    },
    methods: {
//��ҳ
btnClick: function (index) {//ҳ�����¼�
            if (index != this.pageindex) {
this.pageindex = index
}
            //���ݵ��ҳ����������
            this.callApi();
        },
        pageClick: function () {
//���ݵ��ҳ����������
this.callApi();
        },
        callApi: function () {
axios
    .get('/api/m?id=' + marketid + '&pageindex=' + this.pageindex.toString() + '&pagesize=' + this.pagesize.toString())
    .then(response => {
        //Title
        document.title = response.data.title;
        //Donate
        this.donatehtml = response.data.donate;
        //Market Type
        this.market_type = response.data.market_type;
        //Data Tabs
        this.market_type_ref = response.data.market_type_ref;
        //Market Name
        g_market_name = this.market_name = response.data.market_name;
        //Market Prediction
        this.market_prediction = response.data.market_prediction;
        //localtime
        this.localtime = response.data.localtime;
        //tableitems
        this.tableitems = response.data.tableitems;
        //Page Total
        this.pagetotal = response.data.pagetotal;
        //start date
        g_startdate = this.startdate = response.data.startdate;
        //Data tabs
        g_data_tabs = response.data.price_list;
        //Data Dict
        g_data_dict = response.data.data_dict;

        //������>=�߶ȣ�����ʾ���Խ���
        if (window.innerWidth >= window.innerHeight) {
            this.isPC = true;
        }
        //������<�߶ȣ�����ʾ�ֻ�����
        else {
            this.isPC = false;
        };

        marketOrientationChange();
        initanimation();
    })
},
        //���ƶ�����ֻ�е����ָ���item�ı�ʱ���Żᶯ��
        drawItemAnimation: function (item, itemindex) {
            drawItemFrame(item, itemindex, this.tableitems);
        },
        //��ն���
        clearItemAnimation: function (item, itemindex) {
            clearItemFrame(item, itemindex, this.tableitems);
        },
        //��������AI����ϵͳ--�������
        AISystemSwitcherMouseenter: function () {
            if (this.AISystemSwitcherClass.indexOf(" focused") == -1) {
                this.AISystemSwitcherClass += " focused";
            }
        },
        //��������AI����ϵͳ--����Ƴ�
        AISystemSwitcherMouseout: function () {
            if (this.AISystemSwitcherClass.indexOf(" focused") != -1) {
                this.AISystemSwitcherClass.replace(" focused", "");
            }
        },
        //��������AI����ϵͳ--���
        AISystemSwitcherClick: function () {
            this.AISystemSwitcherClass = 'selected';
            this.TurtleSystemSwitcherClass = 'unselected';
        },

        //ԭ�溣�꽻��ϵͳ--�������
        TurtleSystemSwitcherMouseenter: function () {
            if (this.TurtleSystemSwitcherClass.indexOf(" focused") == -1) {
                this.TurtleSystemSwitcherClass += " focused";
            }
        },
        //ԭ�溣�꽻��ϵͳ--����Ƴ�
        TurtleSystemSwitcherMouseout: function () {
            if (this.TurtleSystemSwitcherClass.indexOf(" focused") != -1) {
                this.TurtleSystemSwitcherClass.replace(" focused", "");
            }
},
        //ԭ�溣�꽻��ϵͳ--���
        TurtleSystemSwitcherClick: function () {
            this.AISystemSwitcherClass = 'unselected';
            this.TurtleSystemSwitcherClass = 'selected';
},
    },
    computed: {
//��ҳ
pageindexlist: function () {
            var left = 1;
            var right = this.pagetotal;
            var ar = [];
            if (this.pagetotal >= 5) {
                if (this.pageindex > 3 && this.pageindex < this.pagetotal - 2) {
left = this.pageindex - 2
                    right = this.pageindex + 2
                } else {
                    if (this.pageindex <= 3) {
left = 1
                        right = 5
                    } else {
right = this.pagetotal
                        left = this.pagetotal - 4
                    }
                }
            }
            while (left <= right) {
ar.push(left)
                left++
            }
            return ar
        }
    }
});
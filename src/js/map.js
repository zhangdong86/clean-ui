//菜单名称
NAVNAME = "Home";
MENUNAME = "map";

//初始化
$(function() {
    Map.init();
});

//地图
var Map = {
    el: "map",
    elBlock: ".labBlock",
    data: {
        geoCoord: { //城市坐标
            "上海": [121.48, 31.22],
            "东莞": [113.75, 23.34],
            "深圳": [114.07, 22.02],
            "苏州": [120.62, 31.32],
            "成都": [104.06, 30.67],
            "西安": [108.95, 34.27],
            "南京": [118.78, 32.04],
            "北京": [116.46, 39.92],
            "杭州": [120.19, 30.26],
            "廊坊": [116.7, 38.53],
            "武汉": [114.31, 30.52]
        },
        tipGeoCoord: { //左右浮动框位置
            "BJ": [68, 53],
            "LF": [68, 44],
            "XA": [68, 35],
            "CD": [68, 27],
            "WH": [68, 19],
            "NJ": [140, 53],
            "SU": [140, 44],
            "HZ": [140, 35],
            "DG": [140, 27],
            "SZ": [140, 19]
        },
        data: [{ code: "BJ", name: "北京", ename: "BeiJing", value: { area: 17779, device: 8203, labCount: 58 } },
            { code: "LF", name: "廊坊", ename: "LangFang", value: { area: 4495, device: 3940, labCount: 1 }, sde: true },
            { code: "XA", name: "西安", ename: "XiAn", value: { area: 4489, device: 7530, labCount: 4 }, sde: true },
            { code: "CD", name: "成都", ename: "ChengDu", value: { area: 6572, device: 4424, labCount: 34 }, sde: true },
            { code: "WH", name: "武汉", ename: "WuHan", value: { area: 12296, device: 6172, labCount: 23 }, sde: true },
            { code: "NJ", name: "南京", ename: "NanJing", value: { area: 11037, device: 7285, labCount: 18 }, sde: true },
            { code: "SU", name: "苏州", ename: "SuZhou", value: { area: 1856, device: 850, labCount: 2 } },
            { code: "HZ", name: "杭州", ename: "HangZhou", value: { area: 2010, device: 866, labCount: 2 } },
            { code: "DG", name: "东莞", ename: "DongGuan", value: { area: 2500, device: 2425, labCount: 1 }, sde: true },
            { code: "SZ", name: "深圳", ename: "ShenZhen", value: { area: 20474, device: 6045, labCount: 68 } }
        ],
        line: [
            [{ name: "北京" }, { name: "南京" }],
            [{ name: "北京" }, { name: "武汉" }],
            [{ name: "北京" }, { name: "深圳" }],
            [{ name: "南京" }, { name: "武汉" }],
            [{ name: "南京" }, { name: "深圳" }],
            [{ name: "武汉" }, { name: "深圳" }],
            [{ name: "成都" }, { name: "武汉" }],
            [{ name: "成都" }, { name: "南京" }],
            [{ name: "成都" }, { name: "北京" }],
            [{ name: "成都" }, { name: "深圳" }]
        ]
    },
    init: function() {
        this.chart = echarts.init(document.getElementById(this.el));
        this.option = {
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        areaColor: '#151D4B',
                        borderColor: '#566994',
                        borderWidth: 2
                    },
                    emphasis: {
                        areaColor: '#12183e'
                    }
                }
            },
            series: [{
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                symbol: 'image://data:image/png;base64,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',
                symbolSize: function(val) {
                    return Math.max(val[2].labCount / 4, 4);
                },
                itemStyle: {
                    normal: {
                        color: '#CA9D26'
                    }
                },
                data: []
            }, {
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    trailLength: 0.5,
                    color: '#fff',
                    symbolSize: 2
                },
                lineStyle: {
                    normal: {
                        color: '#FA7C4E',
                        width: 0.2,
                        curveness: 0.2
                    }
                },
                data: []
            }, {
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 1,
                itemStyle: {
                    normal: {
                        color: '#505D7D'
                    }
                },
                data: []
            }, {
                type: 'lines',
                zlevel: 1,
                lineStyle: {
                    normal: {
                        color: '#505D7D'
                    }
                },
                data: []
            }]
        };
        this.setOption();
        this.addLabInfo();
    },
    resize: function() {
        if (this.chart) {
            this.chart.resize();
        }
    },
    setOption: function() {
        var data = this.data,
            geoCoord = data.geoCoord,
            tipGeoCoord = data.tipGeoCoord,
            option = this.option;
        var mapData = [],
            tipData = [],
            tipLine = [];
        $.each(data.data, function(i, o) {
            var name = o.name;
            var code = o.code;
            mapData.push({
                name: name,
                value: geoCoord[name].concat(o.value),
                code: code
            });
            tipData.push({
                name: code,
                value: tipGeoCoord[code].concat(o.value)
            });
            tipLine.push({
                fromName: name,
                toName: code,
                coords: [geoCoord[name], tipGeoCoord[code]]
            });
        });
        option.series[0].data = mapData;
        option.series[1].data = $.map(data.line, function(o) {
            var from = o[0].name;
            var to = o[1].name;
            return {
                fromName: from,
                toName: to,
                coords: [geoCoord[from], geoCoord[to]]
            };
        });
        option.series[2].data = tipData;
        option.series[3].data = tipLine;
        this.chart.setOption(option);
    },
    //显示实验室信息
    addLabInfo: function() {
        var $map = $("#" + this.el),
            mapHeight = $map.height(),
            blockHeight = 84,
            sideBlocksCount = 5,
            minSideMargin = 50,
            blocksHeight = blockHeight * sideBlocksCount,
            mTop = mapHeight > blocksHeight ? (mapHeight - blocksHeight) / (sideBlocksCount + 1) : 0,
            data = this.data.data;
        $(this.elBlock).remove();
        $.each(data, function(i, v) {
            var idx = (i < sideBlocksCount) ? i : (i - sideBlocksCount);
            var top = mTop * (idx + 1) + (blockHeight * idx);
            var side = i < sideBlocksCount ? "left" : "right";
            var left = ($map.width() - mapHeight) / 2 - 270;
            left = (left < minSideMargin) ? minSideMargin : left;
            var html = '<div class="row labBlock {sde}" style="top:{top}px;{side}:{left}px;">' +
                '<div class="col-xs-3 title">{name}</div>' +
                '<div class="col-xs-9 info"><ul class="mapSum">' +
                '<li><span class="icon area"></span><span class="text">{area}m²</span></li>' +
                '<li><span class="icon ratio"></span><span class="text">{labCount}个</span></li>' +
                '<li><span class="icon count"></span><span class="text">{device}台</span></li>' +
                '</ul></div></div>';
            $map.after(html.template({
                name: v.name,
                area: v.value.area,
                device: v.value.device,
                labCount: v.value.labCount,
                top: top,
                side: side,
                left: left,
                sde: v.sde ? 'sdelab' : ''
            }));
        });
    }
};

//页面重置
var onPageResize = function() {
    Map.resize();
    Map.addLabInfo();
};
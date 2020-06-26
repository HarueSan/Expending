<template>
    <div>
        <div>
            <v-app-bar
                color="denim "
                flat
                dark
            >
                <v-toolbar-title>
                สรุปรายจ่าย
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon color="white" @click="homeBtn">mdi-home</v-icon>
                </v-btn>
            </v-app-bar>
        </div>
        <div class="d-flex px-2">
            <v-select @change="showChart" v-model="selMonth" class="mr-1" :items="months" item-text="title" item-value="month" label="เดือน"></v-select>
            <v-select @change="showChart" v-model="selYear" :items="years" label="ปี"></v-select>
        </div>
        <div>
            <div v-show="filterExpending.length != 0">
                <div ref="chart" ></div>
            </div>
            <div v-show="filterExpending.length == 0">
                <p class="text-center">ไม่มีข้อมูล</p>
            </div>
        </div>
        
    </div>
</template>


<script>

import Highcharts from 'highcharts'
import {db} from "../Database"
import _ from 'lodash'

export default {

    data: () =>({
        months : [
            {
                month : 0,
                title : "มกราคม",
            },
            {
                month : 1,
                title : "กุมภาพันธ์",
            },
            {
                month : 2,
                title : "มีนาคม",
            },
            {
                month : 3,
                title : "เมษายน",
            },
            {
                month : 4,
                title : "พฤษภาคม",
            },
            {
                month : 5,
                title : "มิถุนายน",
            },
            {
                month : 6,
                title : "กรกฎาคม",
            },
            {
                month : 7,
                title : "สิงหาคม",
            },
            {
                month : 8,
                title : "กันยายน",
            },
            {
                month : 9,
                title : "ตุลาคม",
            },
            {
                month : 10,
                title : "พฤศจิกายน",
            },
            {
                month : 11,
                title : "ธันวาคม",
            },


        ],
        years : [2020,2021,2022,2023,2024],
        selMonth : (new Date()).getMonth(),
        selYear : (new Date()).getFullYear(),
        expending : []
        
    }),

    computed : {
        filterExpending : function(){
            
            let d = new Date()
            let m = this.selMonth
            let year = this.selYear
            console.log(m,year)

            let r =  this.expending.filter((r) => {
                let date = new Date(r.date)
                return date.getMonth() == m && date.getFullYear() == year
            })

            console.log(r)
            return r
        },
    },


    methods : {
        homeBtn : function(){
            this.$router.push({
                name : "Home"
            })
        },
        showChart : async function(){
            
          
            let result = this.filterExpending
            // filer year and month

            if(result.length != 0){
                let totalPrice = 0
                let total = _.reduce(result, (a,b) => {
                    if (a[b.type]){
                        a[b.type] += parseFloat( b.price )
                    }else {
                        a[b.type] = 0
                        a[b.type] += parseFloat( b.price )
                    }
                    totalPrice += parseFloat( b.price )
                    return a
            }, {})

            let output = []
            _.each(total,(value,key) => {
                total[key] = value / totalPrice * 100
                output.push({
                    name : key,
                    y : total[key]
                })
            })

            console.log(output,total)

            //chart
            let chartElement = this.$refs.chart
            Highcharts.chart(chartElement, {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: 'กราฟแสดงรายจ่ายประจำเดือน'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'คิดเป็น',
                    colorByPoint: true,
                    data: output
                }]
            })
            }

      
    
        },

        
    },

    mounted : async function(){
        let result = await db.find({
            selector : {
                docType : "expending"
            }
        })
        this.expending = result.docs
        this.showChart()    

    }, 
            

}

</script>


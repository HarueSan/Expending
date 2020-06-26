<template>
    <div>
        <div>
            <v-app-bar
                color="denim"
                flat
                dark
            >

                <v-btn icon>
                    <v-icon color="white" @click="homeBtn">mdi-home</v-icon>
                </v-btn>

                <v-toolbar-title >
                ตารางรายจ่าย
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon>
                    <v-icon 
                    color="white"
                    >
                    mdi-cards-heart
                    </v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon 
                    color="white"
                    @click="graphBtn"
                    >
                    mdi-poll
                    </v-icon>
                </v-btn>

            </v-app-bar>
        </div>
        <div>
           <div class="d-flex px-2">
               <v-select v-model="selMonth" class="mr-1" :items="months" item-text="title" item-value="month" label="เดือน"></v-select>
                <v-select v-model="selYear" :items="years" label="ปี"></v-select>
           </div>
            
            <v-simple-table>
                <thead >
                    <tr>
                        <th style="color : #50697D;" class="text-left">วันที่</th>
                        <th style="color : #50697D;" class="text-left">รายการ</th>
                        <th style="color : #50697D;" class="text-left">ราคา</th>
                        <th style="color : #50697D;" class="text-left">หมวดหมู่</th>
                    </tr>
                </thead>
                <tbody v-if="filterExpending.length != 0 ">
                    <tr v-for="item in filterExpending" :key="item._id">
                        <td>{{getDate(item.date)}}</td>
                        <td>{{item.menu}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.type}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="4" class="text-center">ไม่มีข้อมูล</td>
                    </tr>
                </tbody>
            </v-simple-table>
        </div>
        <div style="height:40px;"
            class=" light_gray black--text d-flex justify-center align-center">
            <div>
            รายจ่ายรวม
            <span class="px-2 deep-orange--text accent-3--text font-weight-bold"
            >
                {{totalMoneyMonth}}
            </span>
            บาท
            </div>
        </div>

    </div>
</template>



<script>

import {db} from "../Database"
import _ from 'lodash'

export default {
    data :() => ({
        expending : [],
        selMonth : (new Date()).getMonth(),
        selYear : (new Date()).getFullYear(),
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
        years : [2020,2021,2022,2023,2024]          
    }),
    computed : {
        filterExpending : function(){
            
            let d = new Date()
            let m = this.selMonth
            let year = this.selYear
            console.log(m,year)
            //filter date : select date
            let r =  this.expending.filter((r) => {
                let date = new Date(r.date)
                return date.getMonth() == m && date.getFullYear() == year
            })
            //sort date
            r = _.sortBy(r,(o) => (new Date(o.date)))
            console.log(r)
            return r
        },

        totalMoneyMonth : function() {  
            let sum = 0 
            this.filterExpending.forEach( (r) => {
                sum += parseFloat(r.price)
            })
            return sum;
        }
    },
    mounted : async function(){
        let result = await db.find({
            selector : {
                docType : 'expending',
            }
        })
        this.expending = result.docs
        console.log(this.expending)
    
    },
    methods : {
        getDate : function(dateString) {
            return (new Date(dateString)).getDate()
        },
        homeBtn : function(){
            this.$router.push({
                name : "Home"
            })
        },
        graphBtn : function(){
            this.$router.push({
                name : "Graph"
            })
        },
        
    }

    
}
</script>
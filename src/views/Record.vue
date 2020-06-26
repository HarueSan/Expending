<template>
<div >
    <v-app-bar
        color="denim"
        flat
        dark
    >
        <v-toolbar-title>
        บันทึกรายจ่ายประจำวัน
        </v-toolbar-title>
    </v-app-bar>
    <div>
        <v-col cols="12" sm="6" md="3">
            <v-text-field
            label="รายการ"
            ref="menu"
            v-model="menu"
            outlined
            >
            </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-text-field
            label="ราคา"
            type="number"
            ref="price"
            v-model="price"
            outlined
            >
            </v-text-field>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <v-select
            label="ประเภท"
            ref="type"
            v-model="type"
            :items="type"
            outlined
            >
            </v-select>
        </v-col>
        <v-col cols="12" sm="6" md="3">
            <date-picker v-model="date" label="วันที่" outlined/>
        </v-col>
    </div>
    <div class="d-flex justify-center">
        <v-btn 
        depressed
        color="light_gray"
        ref="cancel-btn"
        @click="cancelBtn"
        >
        ยกเลิก
        </v-btn>
        <v-btn
        class="white--text ml-9"
        depressed
        color="fire_enginered"
        @click="saveBtn"
        >
        บันทึก
        </v-btn>

        
    </div>

</div>
</template>

<script>

import DatePicker from "@/components/DatePicker"
import {db} from "../Database"

export default {
    components : {
        DatePicker,
    },
    data: () => ({
        menu : null,
        type : ['เครื่องแต่งกาย','อาหารการกิน','การศึกษา','การพักผ่อน','ค่าเดินทาง','ค่าใช้จ่ายในบ้าน','อื่นๆ'],
        price : null,
        date : null
    }),
    methods :{
        cancelBtn : function(){
            this.$router.push({
                name : "Home"
            })
        },
        saveBtn : function(){

            console.log(db)

            db.post({
                docType : "expending",
                menu : this.menu,
                price : this.price,
                type : this.type,
                date : this.date
            })
           
           this.$router.push({
                name : "Table"
        })
        }
    }
}
</script>
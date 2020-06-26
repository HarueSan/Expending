<template>
    <div>
        <div>
            <v-app-bar
            color="denim"
            dense
            dark
            >
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>หน้าหลัก</v-toolbar-title>
            </v-app-bar>
        </div>
        <div class="mt-10 mb-10">
            <v-img src="../assets/accounting.png" 
            :contain="true" :height="220" ></v-img>
        </div>
        <v-col cols="12" sm="6">
            <div>
                <v-btn block="" color="red lighten-4" x-large @click="addExpendBtn">เพิ่มรายจ่าย
                    <v-spacer></v-spacer>
                    <v-icon>mdi-pen-plus</v-icon>
                </v-btn>
            </div>

            <div class="mt-3">
                <v-btn block="" color="green lighten-4" x-large @click="tableBtn">ตารางรายจ่าย
                    <v-spacer></v-spacer>
                    <v-icon>mdi-table</v-icon>
                </v-btn>
            </div>

            <div class="mt-3">
                <v-btn block="" color="amber lighten-4" x-large @click="graphBtn">สรุปรายจ่าย
                    <v-spacer></v-spacer>
                    <v-icon>mdi-chart-pie</v-icon>
                </v-btn>
            </div>
        </v-col>
    </div>
</template>


<script>
export default {

    methods : {
        addExpendBtn : function() {
            this.$router.push({
                name : "Record"
            })
        },
        graphBtn : function() {
            this.$router.push({
                name : "Graph"
            })
        },
        tableBtn : function() {
            this.$router.push({
                name : "Table"
            })
        }

    }
    
}
</script>
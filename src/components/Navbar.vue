<template>
<v-col cols="3">
  <v-row justify="start">
    <v-navigation-drawer permanent class="bg-grey-darken-4" >
        <v-img src="https://www.nilvera.com/wp-content/uploads/2022/11/logo.png" cover
        height="11vh"
        ></v-img>
       
        <v-list-item v-for="item in menuItems" :key="item.title"  >
          <router-link :to="item.to" style="text-decoration: none; color: inherit;">
          <v-list-item-action>
            <v-icon :left="item.icon" class="ma-2">{{ item.icon }}</v-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item-action>
        </router-link>
        </v-list-item>
            
        <v-expansion-panels
        :disabled="disabled"
        multiple
        flat
      >    <v-expansion-panel  class="bg-grey-darken-4">
              <v-expansion-panel-title class="pa-2">
                <v-icon left class="ma-2">mdi-folder-settings-outline</v-icon>
                Tanımlamalar
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <router-link to="/stocks" style="text-decoration: none; color: inherit;">
                  <v-list-item-action>
                    <v-icon left class="ma-2">mdi-cube-outline</v-icon>
                    <v-list-item-content>
                      Stok
                    </v-list-item-content>
                  </v-list-item-action>
                </router-link>
                <router-link to="/customers" style="text-decoration: none; color: inherit;">
                  <v-list-item-action>
                    <v-icon left class="ma-2">mdi-account-outline</v-icon>
                    <v-list-item-content>
                      Müşteriler
                    </v-list-item-content>
                  </v-list-item-action>
                </router-link>
              
            </v-expansion-panel-text>
            </v-expansion-panel>
            </v-expansion-panels>
            <v-list>
              <v-list-item-title class="pa-1"> <v-icon left class="ma-2">mdi-domain</v-icon>Yönetim Paneli</v-list-item-title>
              <v-list-item v-for="item in managmentItems" :key="item.title" >
                <v-list-item-action>
                  <v-icon :left="item.icon" class="ma-2">{{ item.icon }}</v-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item-action>
              </v-list-item>
            </v-list>
     
    </v-navigation-drawer>
  </v-row>  
  </v-col>

</template>

<script>

import { ref } from 'vue';

export default {
  setup() {
    

    const menuItems = ref([
      { title: 'Anasayfa', icon: 'mdi-home', to:"/" },
      { title: 'Fatura İşlemleri', icon: 'mdi-pencil-box' },
      { title: 'E-Fatura', icon: 'mdi-invoice-list' },
      { title: 'E-Arşiv', icon: 'mdi-folder-search-outline' },
      { title: 'E-İrsaliye', icon: 'mdi-note-outline' },
      { title: 'E-Defter', icon: 'mdi-notebook-outline' },
      { title: 'E-SMM', icon: 'mdi-bag-checked'},
      { title: 'E-MM', icon: 'mdi-archive-settings' },
      { title: 'Raporlar', icon: 'mdi-finance'},
      
    ]);

    const managmentItems = ref([
      { title: 'Firma Bilgileri', icon: 'mdi-office-building-outline'},
      { title: 'Kullanıcılar', icon: 'mdi-account-group' },
      { title: 'API Tanımları', icon: 'mdi-key-outline' },
    ]);

    return {
      menuItems,
      managmentItems,
     
    };
  }
}
</script>

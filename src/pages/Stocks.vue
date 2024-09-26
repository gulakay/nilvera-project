<template>
  <v-container fluid class="pa-0">
    <v-col cols="12" class="mb-3">
      <v-row justify="end">
        <v-card flat class="d-flex justify-end align-start">
          <span class="text-end font-weight-light ma-2">Merhaba, Gül</span>
          <v-avatar color="#EF5350" size="50">G</v-avatar>
        </v-card>
      </v-row>
    </v-col>

    <v-row justify="end">
      <v-col cols="12">
        <v-card>
          <v-toolbar class="bg-white">
            <v-text-field
              v-model="search"
              placeholder="Aranacak kelimeyi girin..."
              label="Ara"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
            <div class="d-flex flex-row align-center ma-3 ga-4">
              <v-btn color="#0D47A1" size="small" variant="outlined">
                <v-icon>mdi-magnify</v-icon>Ara
              </v-btn>
              <v-btn color="#64B5F6" size="small" variant="outlined" @click="openCreateDialog">
                <v-icon>mdi-plus</v-icon>Yeni Stok
              </v-btn>
            </div>
          </v-toolbar>

          <v-data-table
            :headers="headers"
            :items="stockList"
            :search="search"
            :items-per-page="10"
            show-select
            class="data-table-responsive"
          >
            <template v-slot:item.IsActive="{ item }">
              <v-chip
                :color="item.IsActive ? 'green' : 'red'"
                :text="item.IsActive ? 'Aktif' : 'Pasif'"
                class="text-uppercase"
                size="small"
                label
              >
                <v-icon v-if="item.IsActive === true">mdi-check</v-icon>
                <v-icon v-else>mdi-close</v-icon>
              </v-chip>
            </template>
            <template v-slot:item.Transactions="{ item }">
              <div class="d-flex justify-center align-baseline">
                <v-btn color="info" size="small" class="ma-2" @click="editStock(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="red" size="small" @click="deleteStock(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <StockDialog 
      v-if="dialog"
      :is-visible="dialog" 
      :process-type="processType" 
      :stock-list="stockList" 
      :editing-stock="editedStock" 
      @update:is-visible="dialog = $event" 
    /> 
  
    <v-main>
      <router-view />
    </v-main>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import StockDialog from '../components/StockDialog.vue'; 

export default {
  components: {
    StockDialog 
  },
  setup() {
    const search = ref('');
    const dialog = ref(false);
    const processType = ref();
    const editedStock = ref({}); 
    const headers = ref([
      { title: 'Stok Adı', key: 'Name' },
      { title: 'Birim Kodu', key: 'UnitCode' },
      { title: 'Birim Adı', key: 'UnitName' },
      { title: 'Fiyat', key: 'Price' },
      { title: 'KDV (%20)', key: 'TaxPercent' },
      { title: 'Aktiflik', key: 'IsActive' },
      { title: 'İşlemler', key: 'Transactions', sortable: false },
    ]);
    
    const stockList = ref([]);
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apitest.nilvera.com/general/Stocks', {
          headers: {
            Authorization: 'Bearer B55737B01254C6A12018A43E52BBE6D298EC55ECBED62674EB070A977EE49FA9',
          },
        });
        
        stockList.value = response.data.Content || []; 
        console.log(response.data.Content);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    const deleteStock = async (stock) => {

        
        stockList.value = stockList.value.filter(s => s.ID !== stock.ID);
        console.log('Stok başarıyla silindi');
 
    };

    const editStock = (stock) => {
      console.log('Düzenleme butonuna tıklandı:', stock); 
      editedStock.value ={...stock} ; 
      dialog.value = true; 
      processType.value = 2;
    };

    const openCreateDialog = () => {
      console.log('Yeni Stok butonuna tıklandı'); 
      editedStock.value = {}; 
      processType.value = 1;
      dialog.value = true;
      console.log('Dialog açıldı:', dialog.value); 
    };

    onMounted(() => {
      fetchData();
    });

    return {
      processType,
      search,
      headers,
      stockList,
      deleteStock,
      dialog,
      editedStock,
      editStock,
      openCreateDialog,
    };
  },
};
</script>

<style>
.data-table-responsive {
  overflow-x: auto;
}

@media (max-width: 600px) {
  .v-card {
    padding: 1rem; 
  }
  .v-toolbar {
    flex-direction: column; 
    align-items: stretch; 
  }
  .data-table-responsive {
    width: 100%;
    overflow-x: auto; 
  }
}
</style>

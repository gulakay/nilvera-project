<template>
  <v-container fluid class="pa-0">
    <v-col cols="12" class="mb-3">
      <v-row justify="end">
        <v-card flat class="d-flex justify-end align-end">
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
              <v-btn color="#64B5F6" size="small" variant="outlined">
                <v-icon>mdi-menu</v-icon>İşlemler
              </v-btn>
              <v-btn color="#64B5F6" size="small" variant="outlined" @click="openCreateDialog">
                <v-icon>mdi-plus</v-icon>Yeni Müşteri
              </v-btn>
            </div>
          </v-toolbar>

          <v-data-table 
            :headers="headers"
            :items="customerList" 
            :search="search" 
            :loading="loading" 
            :items-per-page="10" 
            show-select
            class="data-table-responsive"
          >
            <template v-slot:item.Transactions="{ item }">
              <div class="d-flex justify-center align-baseline">
                <v-btn color="info" size="small" class="ma-2" @click="editCustomer(item)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="red" size="small" @click="deleteCustomer(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <CustomerDialog 
    v-if="dialog"
      :isVisible="dialog" 
      :process-type="processType" 
      :customer-list="customerList"
      :editing-customer="editedCustomer" 
      @update:isVisible="dialog = $event" 
     
    />
  
    <v-main>
      <router-view />
    </v-main>
  </v-container>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, defineComponent } from 'vue';
import CustomerDialog from '../components/CustomerDialog.vue'; 

export default defineComponent({
  components: {
    CustomerDialog 
  },
  setup() {
    const search = ref('');
    const dialog = ref(false); 
    const processType = ref();
    const editedCustomer = ref({}); 

    const headers = ref([
      { title: 'Firma Bilgileri', key: 'Name' },
      { title: 'VKN/TCKN', key: 'ID' },
      { title: 'Vergi Dairesi', key: 'TaxDepartment' },
      { title: 'İletişim', key: 'Phone' },
      { title: 'Şehir', key: 'City' },
      { title: 'İşlemler', key: 'Transactions', sortable: false },
    ]);
    
    const customerList = ref([]);
    
    const fetchData = async () => {
      try {
        const response = await axios.get('https://apitest.nilvera.com/general/Customers', {
          headers: {
            Authorization: 'Bearer B55737B01254C6A12018A43E52BBE6D298EC55ECBED62674EB070A977EE49FA9',
          },
        });
       
        customerList.value = response.data.Content;
        console.log(response.data.Content);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    
    const deleteCustomer = async (customer) => {
    
        customerList.value = customerList.value.filter(c => c.ID !== customer.ID);
        console.log('Müşteri başarıyla silindi');
      
    };

    const editCustomer = (customer) => {
      editedCustomer.value = { ...customer }; 
      dialog.value = true; 
      processType.value = 2;
    };
    const openCreateDialog = () => {
  console.log('Yeni Müşteri butonuna tıklandı'); 
  editedCustomer.value = {}; 
  processType.value = 1;
  dialog.value = true;
  console.log('Dialog açıldı:', dialog.value); 
};

    onMounted(() => {
      fetchData();
    });

    return {
      search,
      dialog,
      processType,
      editedCustomer,
      headers,
      customerList,
      deleteCustomer,
      editCustomer,
      openCreateDialog,
     
    };
  }
});
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

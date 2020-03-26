<template>
    <v-container
        fluid
        v-if="error"
        v-cloak
        class="animated pulse infinite"
        text-xs-center
    >
        <v-flex xl12>
            <v-layout row justify-center>
                <v-icon
                    x-large
                    dark
                    color="red darken-2"
                    class="status-mesage-icon"
                    >{{ errorIcon }}</v-icon
                >
                <h1
                    class="status-message-text font-weight-bold mb-3 red--text text--darken-2"
                >
                    {{ errorMessageHeaderText }}
                </h1>
            </v-layout>
            <v-layout row justify-center>
                <h3
                    class="status-message-detail font-weight-bold mb-3 grey--text text--darken-1"
                >
                    {{ errorMessageDetailText }}
                </h3>
            </v-layout>
        </v-flex>
    </v-container>
    <v-container v-else v-cloak fluid text-xs-center>
        <v-flex xl12 mt-10>
            <v-layout justify-center>
                <v-data-table
                    :headers="headers"
                    :items="nodes"
                    :loading="loading"
                    sort-by="nodeId"
                    class="elevation-1"
                >
                    <template v-slot:item="{ item }">
                        <tr>
                            <td>{{ item.nodeId }}</td>
                            <td>{{ item.city }}</td>
                            <td>{{ item.onlineTime | getHumanDate }}</td>
                            <td>
                                <v-btn
                                    class="white--text"
                                    :title="getButtonToolTip(item.isOnline)"
                                    :color="
                                        getOnlineStatusColour(item.isOnline)
                                    "
                                    @click="changeStatus(item)"
                                    >{{
                                        item.isOnline ? 'Online' : 'Offline'
                                    }}</v-btn
                                >
                            </td>
                            <td
                                :class="{ red: item.uploadUtilizationExceeded }"
                            >
                                {{ item.uploadUtilization }}
                            </td>
                            <td>{{ item.maxUploadUtilization }}</td>
                            <td
                                :class="{
                                    red: item.downloadUtilizationExceeded
                                }"
                            >
                                {{ item.downloadUtilization }}
                            </td>
                            <td>{{ item.maxDownloadUtilization }}</td>
                            <td :class="{ red: item.errorRateExceeded }">
                                {{ item.errorRate }}
                            </td>
                            <td>{{ item.maxErrorRate }}</td>
                            <td :class="{ red: item.connectedClientsExceeded }">
                                {{ item.connectedClients }}
                            </td>
                            <td>{{ item.maxConnectedClients }}</td>
                            <td>
                                <v-icon
                                    small
                                    class="mr-2"
                                    title="Edit"
                                    @click="editItem(item)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon
                                    small
                                    title="Delete"
                                    @click="deleteItem(item.nodeId)"
                                >
                                    mdi-delete
                                </v-icon>
                            </td>
                        </tr>
                    </template>
                    <!-- </v-data-table> -->
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title>Nodes</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <div class="flex-grow-1"></div>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn
                                        color="primary"
                                        rounded
                                        dark
                                        class="mb-2"
                                        v-on="on"
                                        @click="addNodeDialog = true"
                                        ><v-icon>mdi-plus</v-icon> Add
                                        Node</v-btn
                                    >
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{
                                            formTitle
                                        }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container v-show="addNodeDialog">
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="addItem.nodeId"
                                                        label="Node Id"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="addItem.city"
                                                        label="City"
                                                        placeholder="e.g. Toronto"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            addItem.maxUploadUtilization
                                                        "
                                                        label="Max Upload Utilization"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            addItem.maxDownloadUtilization
                                                        "
                                                        label="Max Download Utilization"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            addItem.maxConnectedClients
                                                        "
                                                        label="Max Connected Clients"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            addItem.maxErrorRate
                                                        "
                                                        label="Max Error Rate"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                        <v-container v-show="!addNodeDialog">
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.maxUploadUtilization
                                                        "
                                                        label="Max Upload Utilization"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.maxDownloadUtilization
                                                        "
                                                        label="Max Download Utilization"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.maxConnectedClients
                                                        "
                                                        label="Max Connected Clients"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                        v-model="
                                                            editedItem.maxErrorRate
                                                        "
                                                        label="Max Error Rate"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <div class="flex-grow-1"></div>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                            >Cancel</v-btn
                                        >
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                            >Save</v-btn
                                        >
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>

                    <template v-slot:no-data>
                        <v-btn color="primary" @click="getNodes()"
                            >Reload</v-btn
                        >
                    </template>
                </v-data-table>
            </v-layout>
        </v-flex>
        <v-snackbar
            v-model="snackbarVisible"
            :color="snackbarColor"
            :timeout="snackbarTimeout"
        >
            {{ snackbarMessage }}
            <v-btn dark color="info" text @click="snackbarVisible = false"
                >Close</v-btn
            >
        </v-snackbar>
        <v-row justify="center">
            <v-dialog v-model="deleteDialog" persistent max-width="290">
                <v-card>
                    <v-card-title class="headline">Delete Node</v-card-title>
                    <v-card-text
                        >Are you sure you want to delete Node
                        {{ currentNodeId }}?</v-card-text
                    >
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn
                            color="red darken-1"
                            text
                            @click="deleteDialog = false"
                            >Cancel</v-btn
                        >
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="
                                () => {
                                    deleteDialog = false;
                                    confirmDelete = true;
                                    deleteItem(currentNodeId);
                                }
                            "
                            >OK</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </v-container>
</template>

<script>
import { apiConfig } from '../apiConfig';
import moment from 'moment';

export default {
    name: 'Admin',
    async created() {
        await this.getNodes();
    },
    data: () => ({
        loading: false,
        refreshIntervalId: null,
        dataRefreshInterval: 10000,
        error: false,
        errorMessageHeaderText: 'Error!',
        errorMessageDetailText: '',
        errorIcon: 'mdi-alert-circle-outline',
        itemsPerPage: 10,
        page: 1,
        nodes: [],
        //Snackbar config
        snackbarVisible: false,
        snackbarColor: 'error',
        snackbarTimeout: 3000,
        snackbarMessage: '',
        dialog: false,
        deleteDialog: false,
        confirmDelete: false,
        currentNodeId: null,
        addNodeDialog: false,
        headers: [
            {
                text: 'Node Id',
                align: 'left',
                sortable: true,
                value: 'nodeId'
            },
            { text: 'City', value: 'city' },
            { text: 'Online Time', value: 'onlineTime' },
            { text: 'Online/Offline', value: 'isOnline' },
            { text: 'Upload Utilization', value: 'uploadUtilization' },
            { text: 'Max Upload Utilization', value: 'maxUploadUtilization' },
            { text: 'Download Utilization', value: 'downloadUtilization' },
            {
                text: 'Max Download Utilization',
                value: 'maxDownloadUtilization'
            },
            { text: 'Error Rate', value: 'errorRate' },
            { text: 'Max Error Rate', value: 'maxErrorRate' },
            { text: 'Connected Clients', value: 'connectedClients' },
            { text: 'Max Connected Clients', value: 'maxConnectedClients' },
            { text: 'Actions', value: 'action', sortable: false }
        ],
        addItem: {
            nodeId: 0,
            city: '',
            maxUploadUtilization: 0,
            maxDownloadUtilization: 0,
            maxConnectedClients: 0,
            maxErrorRate: 0,
            isOnline: false
        },
        editedIndex: -1,
        editedItem: {
            maxUploadUtilization: 0,
            maxDownloadUtilization: 0,
            maxConnectedClients: 0,
            maxErrorRate: 0,
            isOnline: false
        },
        defaultItem: {
            nodeId: 0,
            city: ' ',
            maxUploadUtilization: 0,
            maxDownloadUtilization: 0,
            maxConnectedClients: 0,
            maxErrorRate: 0,
            isOnline: false
        }
    }),
    filters: {
        getHumanDate(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    watch: {
        dialog(val) {
            val || this.close();
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Add Node' : 'Edit Node';
        }
    },
    methods: {
        getOnlineStatusColour(item) {
            if (item) return 'green';
            else return 'red';
        },

        getButtonToolTip(item) {
            if (item) return 'Turn Node Offline';
            else return 'Turn Node Online';
        },

        getNodes(nodeId = null) {
            this.loading = true;
            this.errorMessageDetailText = '';

            if (nodeId && nodeId != null) {
                try {
                    this.$http({
                        url: apiConfig.fetch.url.concat(nodeId),
                        method: apiConfig.fetch.method
                    })
                        .then(result => {
                            if (result.data.length) {
                                this.nodes = Object.freeze(result.data);
                                this.loading = false;
                                this.error = false;
                            }
                        })
                        .catch(error => {
                            this.showNotification('error', error);
                            this.loading = false;
                            this.errorMessageDetailText = error;
                        });
                } catch (error) {
                    this.showNotification('error', error);
                    this.loading = false;
                    this.errorMessageDetailText = error;
                }
            } else {
                try {
                    this.$http({
                        url: apiConfig.fetch.url,
                        method: apiConfig.fetch.method
                    })
                        .then(result => {
                            if (result.data.length) {
                                this.nodes = Object.freeze(result.data);
                                this.loading = false;
                                this.error = false;
                            }
                        })
                        .catch(error => {
                            this.showNotification('error', error);
                            this.loading = false;
                            this.errorMessageDetailText = error;
                        });
                } catch (error) {
                    this.showNotification('error', error);
                    this.loading = false;
                    this.errorMessageDetailText = error;
                }
            }
        },
        showNotification(type, message, timeout = 3000) {
            this.snackbarColor = type;
            this.snackbarMessage = message;
            this.snackbarTimeout = timeout;
            this.snackbarVisible = true;
        },
        editItem(item) {
            this.editedIndex = this.nodes.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.formTitle = 'Set Maximum Limits for Node'.concat(item.nodeId);
            this.dialog = true;
        },

        deleteItem(nodeId) {
            this.errorMessageHeaderText = '';
            this.currentNodeId = nodeId;
            this.deleteDialog = true;

            if (this.confirmDelete) {
                try {
                    this.$http({
                        url: apiConfig.delete.url.concat(this.currentNodeId),
                        method: apiConfig.delete.method
                    })
                        .then(result => {
                            this.showNotification('success', result.data);
                            this.loading = false;
                            this.confirmDelete = false;
                            this.deleteDialog = false;
                            this.currentNodeId = null;
                            this.getNodes();
                        })
                        .catch(error => {
                            this.showNotification('error', error);
                            this.loading = false;
                            this.errorMessageDetailText = error;
                        });
                } catch (error) {
                    this.showNotification('error', error);
                    this.loading = false;
                    this.errorMessageDetailText = error;
                }
            }
        },

        close() {
            this.dialog = false;
            this.addNodeDialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
                this.addedItem = Object.assign({}, this.defaultItem);
                this.addedIndex = -1;
            }, 300);
        },
        changeStatus(item) {
            if (item.isOnline) {
                try {
                    this.$http({
                        url: apiConfig.offline.url.concat(item.nodeId),
                        method: apiConfig.offline.method
                    })
                        .then(result => {
                            this.showNotification('success', result.data);
                            this.loading = false;
                            this.getNodes();
                        })
                        .catch(error => {
                            this.showNotification('error', error);
                            this.loading = false;
                            this.errorMessageDetailText = error;
                        });
                } catch (error) {
                    this.showNotification('error', error);
                    this.loading = false;
                    this.errorMessageDetailText = error;
                }
            } else {
                try {
                    this.$http({
                        url: apiConfig.online.url.concat(item.nodeId),
                        method: apiConfig.online.method
                    })
                        .then(result => {
                            this.showNotification('success', result.data);
                            this.loading = false;
                            this.getNodes();
                        })
                        .catch(error => {
                            this.showNotification('error', error);
                            this.loading = false;
                            this.errorMessageDetailText = error;
                        });
                } catch (error) {
                    this.showNotification('error', error);
                    this.loading = false;
                    this.errorMessageDetailText = error;
                }
            }
        },
        save() {
            if (this.addNodeDialog) {
                if (
                    this.addItem.nodeId > 0 &&
                    this.addItem.city.length &&
                    this.addItem.maxUploadUtilization != null &&
                    this.addItem.maxDownloadUtilization != null &&
                    this.addItem.maxErrorRate != null &&
                    this.addItem.maxConnectedClients != null
                ) {
                    try {
                        this.$http({
                            url: apiConfig.create.url,
                            method: apiConfig.create.method,
                            data: {
                                nodeId: Number(this.addItem.nodeId),
                                city: this.addItem.city,
                                maxUploadUtilization: Number(
                                    this.addItem.maxUploadUtilization
                                ),
                                maxDownloadUtilization: Number(
                                    this.addItem.maxDownloadUtilization
                                ),
                                maxErrorRate: Number(this.addItem.maxErrorRate),
                                maxConnectedClients: Number(
                                    this.addItem.maxConnectedClients
                                )
                            }
                        })
                            .then(result => {
                                this.showNotification('success', result.data);
                                this.loading = false;
                                this.getNodes();
                            })
                            .catch(error => {
                                this.showNotification('error', error);
                                this.loading = false;
                                this.errorMessageDetailText = error;
                            });
                    } catch (error) {
                        this.showNotification('error', error);
                        this.loading = false;
                        this.errorMessageDetailText = error;
                    }
                }
            } else {
                if (
                    this.editedItem.maxUploadUtilization != null &&
                    this.editedItem.maxDownloadUtilization != null &&
                    this.editedItem.maxErrorRate != null &&
                    this.editedItem.maxConnectedClients != null
                ) {
                    try {
                        this.$http({
                            url: apiConfig.maxLimits.url,
                            method: apiConfig.maxLimits.method,
                            data: {
                                nodeId: Number(this.editedItem.nodeId),
                                maxUploadUtilization: Number(
                                    this.editedItem.maxUploadUtilization
                                ),
                                maxDownloadUtilization: Number(
                                    this.editedItem.maxDownloadUtilization
                                ),
                                maxErrorRate: Number(
                                    this.editedItem.maxErrorRate
                                ),
                                maxConnectedClients: Number(
                                    this.editedItem.maxConnectedClients
                                )
                            }
                        })
                            .then(result => {
                                this.showNotification('success', result.data);
                                this.loading = false;
                                this.getNodes();
                            })
                            .catch(error => {
                                this.showNotification('error', error);
                                this.loading = false;
                                this.errorMessageDetailText = error;
                            });
                    } catch (error) {
                        this.showNotification('error', error);
                        this.loading = false;
                        this.errorMessageDetailText = error;
                    }
                }
            }

            this.close();
        }
    }
};
</script>

<style>
[v-cloak] > * {
    display: none;
}

[v-cloak]::before {
    content: 'Loading...';
}

.status-mesage-icon {
    font-size: 10em !important;
}

.status-message-text {
    font-size: 9em !important;
}

.status-message-detail {
    font-size: 2em !important;
}

.green {
    background-color: green;
}

.red {
    background-color: red;
    color: white;
}

tbody tr:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.05);
}
</style>

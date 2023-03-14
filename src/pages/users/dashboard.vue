<template>
  <q-page padding class="column row">
    <!--    Skeleton for profile card and statistics card-->
    <div v-if="listContent == false" class="q-gutter-y-md bg-transparent">
      <q-banner v-if="loading == true" class="bg-negative text-white">
        <template v-slot:avatar>
          <q-icon name="signal_wifi_off" color="white" />
        </template>
        You have lost connection to the internet. This app is offline.
        <template v-slot:action>
          <q-btn @click="getData" outline color="white" label="Retry" />
        </template>
      </q-banner>
      <q-card flat class="stat-card white-frost q-pa-md text-weight-bold">
        <q-item>
          <q-item-section top avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5 text-white">
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label class="text-grey">
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-skeleton type="QBtn" />
          </q-item-section>
        </q-item>
      </q-card>
      <q-card flat class="stat-card white-frost q-pa-md text-weight-bold">
        <q-item>
          <q-item-section top avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-h5 text-white">
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label class="text-grey">
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-skeleton type="QBtn" />
          </q-item-section>
        </q-item>
      </q-card>
    </div>
    <!--loaded profile & statistics card -->
    <transition-group
      v-else
      appear
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideInUp"
    >

      <div key="div" class="q-gutter-y-md bg-transparent">
        <!--    User profile card-->
        <q-card
          style="background: linear-gradient(90deg, #FF512F 0%, #DD2476 100%); border-radius: 20px;"
          flat
          class="justify-between radius-16 glass-bg-dark col-md-1 row q-pt-md q-pb-md q-pl-sm q-pr-sm q-mb-md"
        >
          <q-item class="justify-start">
            <q-item-section top avatar>
              <q-avatar
                rounded
                class="avartar"
                text-color="white"
                size="40px"
                color="orange"
                icon="person"
              />
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-h6 text-grey-1 ">{{ this.userSession.fullName }}</q-item-label>
              <q-item-label class="text-grey-2">{{ this.userSession.staffId }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            class="flex-center flex justify-end"
          >
            <div>
              <q-btn
                :to="{ name: 'profile-staff' }"
                fab-mini
                flat
                icon-right="chevron_right"
                color="white"
                no-caps
                text-color="white"
              />
            </div>
          </q-item>
        </q-card>
        <!--      statistics card-->
        <q-card
          style="background: linear-gradient(90deg, #41295A 0%, #2F0743 100%); border-radius: 20px;"
          key="card"
          flat
          class="stat-card radius-16 dark-frost q-pa-md text-weight-bold q-mb-sm"
        >
          <q-item key="item">
            <q-item-section top avatar>
              <q-avatar
                key="avartar"
                text-color="white"
                size="60px"
                color="white-opacity"
                icon="receipt"
              />
            </q-item-section>

            <q-item-section key="section">
              <q-item-label
                key="item-label-1"
                class="text-h3 text-weight-bolder text-white"
              >{{ this.reports.length }}</q-item-label
              >
              <q-item-label key="item-label-2" class="text-grey"
              >Total Reports Sent</q-item-label
              >
            </q-item-section>
            <q-item-section avatar key="avartar">
              <q-btn
                key="btn-1"
                flat
                text-color="white"
                round
                color="white-opacity"
                icon="chevron_right"
                :to="{ name: 'reports-staff' }"
              />
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </transition-group>
    <!--    skeleton for list of recent reports -->
    <div v-if="listContent == false">
      <q-list
        class="q-ml-xs q-mr-xs q-mb-sm bg-transparent text-grey rounded-borders q-gutter-y-sm"
      >
        <q-item-label key="label" class="text-grey" header>
          <q-skeleton type="QChip" />
        </q-item-label>
        <q-item style="max-width: 300px">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="90%" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" width="35%" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item style="max-width: 300px">
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" width="35%" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <transition-group
      v-else
      appear
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideInUp"
    >
      <q-list
        v-if="reports.length > 0"
        key="list"
        transition-show="jump-down"
        transition-hide="jump-up"
        class="q-ml-xs q-mb-xs q-mr-xs q-mb-sm bg-transparent text-grey rounded-borders q-gutter-y-sm "
      >
        <q-chip class="q-mt-sm q-pt-sm" style="border-radius: 8px">Recent ({{ this.reports.length }})</q-chip>
        <q-item
          class="text-white list-card"
          v-ripple
          v-for="(report, index) in reports"
          :key="index"

        >
          <!--          mvdv click item-->
          <q-item-section  v-if="report.reportTypeId==='322332331'" clickable avatar :key="index + 1" @click="(mvdvDetails = report), (dialog.mvdvView = !dialog.mvdvView)">
            <q-avatar  color="teal-10"  class="iosRounded" :key="index">
              <q-icon  name="directions_boat" color="white" :key="index" />
            </q-avatar>
          </q-item-section>

          <!--          mvst click item-->
          <q-item-section  v-if="report.reportTypeId==='322332335'" clickable avatar :key="index + 1" @click="(mvstDetails = report), (dialog.mvstView = !dialog.mvstView)">
            <q-avatar  color="orange"  class="iosRounded" :key="index">
              <q-icon  name="directions_boat" color="white" :key="index" />
            </q-avatar>
          </q-item-section>

          <!--          dvst click item-->
          <q-item-section  v-if="report.reportTypeId==='322332332'" clickable avatar :key="index + 1" @click="(dvstDetails = report), (dialog.dvstView = !dialog.dvstView)">
            <q-avatar  color="purple"  class="iosRounded" :key="index">
              <q-icon  name="sailing" color="white" :key="index" />
            </q-avatar>
          </q-item-section>

          <!--          st click item-->
          <q-item-section  v-if="report.reportTypeId==='322332334'" clickable avatar :key="index + 1" @click="(stDetails = report), (dialog.stView = !dialog.stView)">
            <q-avatar  color="brown"  class="iosRounded" :key="index">
              <q-icon  name="factory" color="white" :key="index" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-grey" :key="index + 2">
            <q-item-label :key="index + 3" lines="1" class="text-capitalize" v-if="report.reportTypeId==='322332331'">{{ report.motherVessel.vesselName }}</q-item-label>
            <q-item-label :key="index + 3" lines="1" class="text-capitalize" v-if="report.reportTypeId==='322332332'">{{ report.daughterVessel.vesselName }}</q-item-label>
            <q-item-label :key="index + 3" lines="1" class="text-capitalize" v-if="report.reportTypeId==='322332333'">{{ report.storageName }}</q-item-label>
            <q-item-label :key="index + 3" lines="1" class="text-capitalize" v-if="report.reportTypeId==='322332334'">{{ report.storageName }}</q-item-label>
            <q-item-label :key="index + 3" lines="1" class="text-capitalize" v-if="report.reportTypeId==='322332335'">{{ report.motherVessel.vesselName }}</q-item-label>
            <q-item-label :key="index + 4" caption lines="2">
              <span class="text-weight-bold">{{ humanDate(report.createdAt) }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section :key="index + 5" class="text-grey" side top>
            <q-badge color="grey" dense>{{ report.productName }}</q-badge>

            <q-item-label class="q-mt-sm" caption>{{ ago(report.createdAt) }}</q-item-label>

          </q-item-section>
        </q-item>
      </q-list>
    </transition-group>

    <!--    view record mvdv -->
    <q-dialog
      full-height
      content-class=" white-frost "
      v-model="dialog.mvdvView"
      :position="position"
    >
      <q-card class="scroll fullscreen bg-white">
        <q-toolbar class="text-grey">
          <q-btn
            flat
            round
            color="grey"
            dense
            icon="chevron_left"
            v-close-popup
          />
          <q-avatar class="" text-color="white"  color="teal-10" icon="directions_boat"></q-avatar>

          <q-toolbar-title no-caps> Report </q-toolbar-title>
        </q-toolbar>
        <div
          class="q-pa-md q-mt-md q-mb-md text-grey text-left flex flex-center column q-gutter-y-md"
        >
          <q-timeline color="secondary">
            <q-timeline-entry
              title="Mother vessel  to Daughter vessel "
              :subtitle="mvdvDetails.id"
              color="orange"
              icon="receipt"
            >
              <div>
                {{ this.humanDate(mvdvDetails.createdAt) }}
              </div>
              <div>
                {{ mvdvDetails.inspectorName  }}
              </div>
              <div>
                {{ mvdvDetails.staffId  }}
              </div>
            </q-timeline-entry>
            <!--            Mother vessel details-->
            <q-timeline-entry heading class="text-capitalize">
              <q-chip icon="directions_boat">Mother vessel details</q-chip>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="directions_boat"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvdvDetails.motherVessel.vesselName }}</q-item-label>
                    <q-item-label caption>Mother vessel</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="oil_barrel"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvdvDetails.productName }}</q-item-label>
                    <q-item-label caption>Product</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(mvdvDetails.expArrivalDate) }}</q-item-label>
<!--                    <q-item-label>{{ humanDate(mvdvDetails.expArrivalDate) }}</q-item-label>-->
                    <q-item-label caption>Arrival Date</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(mvdvDetails.qty) }} Metric ton</q-item-label>
                    <q-item-label caption>Quantity on Arrival ( {{ this.convertUnit(mvdvDetails.qty,'ton', mvdvDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(mvdvDetails.qtyDischarged) }} Metric ton</q-item-label>
                    <q-item-label caption>Quantity Discharged ( {{ this.convertUnit(mvdvDetails.qtyDischarged,'ton', mvdvDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvdvDetails.supervisorSource }}</q-item-label>
                    <q-item-label caption>Inspector/Supervisor</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>

            <!--            Daughter vessel details-->
            <q-timeline-entry heading class="text-capitalize">
              <q-chip icon="sailing">Daughter vessel details</q-chip>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="sailing"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvdvDetails.daughterVessel.vesselName }}</q-item-label>
                    <q-item-label caption>Daughter vessel</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(mvdvDetails.qtyReceived)  }}   Metric Tons </q-item-label>
                    <q-item-label caption>Quantity Received( {{ this.convertUnit(mvdvDetails.qtyReceived,'ton', mvdvDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(mvdvDetails.startTime) }}</q-item-label>
                    <q-item-label caption>Commence Discharge Time</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ this.humanDate(mvdvDetails.completionTime) }}</q-item-label>
                    <q-item-label caption> Complete Discharge Time</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvdvDetails.supervisorDestination }}</q-item-label>
                    <q-item-label caption>Inspector/Supervisor</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvdvDetails.inspectorName }}</q-item-label>
                    <q-item-label caption>Report by</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="event"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(mvdvDetails.createdAt) }}</q-item-label>
                    <q-item-label caption>Date submitted</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry
              v-if="mvdvDetails.observation!==''"
              subtitle="Issue"
              icon="description"
            >
              <div>
                {{ mvdvDetails.observation }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>

      </q-card>
    </q-dialog>
<!--    view record mvst -->
    <q-dialog
      full-height
      content-class=" white-frost "
      v-model="dialog.mvstView"
      :position="position"
    >
      <q-card class="scroll fullscreen bg-white">
        <q-toolbar class="text-grey">
          <q-btn
            flat
            round
            color="grey"
            dense
            icon="chevron_left"
            v-close-popup
          />
          <q-avatar  color="orange" class=""  text-color="white"  icon="directions_boat"></q-avatar>
          <q-toolbar-title no-caps> Report </q-toolbar-title>
        </q-toolbar>
        <div
          class="q-pa-md q-mt-md q-mb-md text-grey text-left flex flex-center column q-gutter-y-md"
        >
          <q-timeline color="secondary">
            <q-timeline-entry
              title="Mother Vessel to Storage"
              :subtitle="mvstDetails.id"
              color="orange"
              icon="receipt"
            >
              <div>
                {{ this.humanDate(mvstDetails.createdAt) }}
              </div>
              <div>
                {{ mvstDetails.inspectorName  }}
              </div>
              <div>
                {{ mvstDetails.staffId  }}
              </div>
            </q-timeline-entry>
            <!--            Mother vessel details-->
            <q-timeline-entry heading class="text-capitalize">
              <q-chip icon="directions_boat">Mother vessel details</q-chip>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="directions_boat"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvstDetails.motherVessel.vesselName }}</q-item-label>
                    <q-item-label caption>Mother vessel</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="oil_barrel"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvstDetails.productName }}</q-item-label>
                    <q-item-label caption>Product</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(mvstDetails.order.expArrivalDate) }}</q-item-label>
                    <!--                    <q-item-label>{{ humanDate(mvstDetails.expArrivalDate) }}</q-item-label>-->
                    <q-item-label caption>Arrival Date</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(mvstDetails.qty) }} Metric ton</q-item-label>
                    <q-item-label caption>Quantity on Arrival ( {{ this.convertUnit(mvstDetails.qty,'ton', mvstDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(mvstDetails.qtyDischarged) }} Metric ton</q-item-label>
                    <q-item-label caption>Quantity Discharged ( {{ this.convertUnit(mvstDetails.qtyDischarged,'ton', mvstDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvstDetails.supervisorSource }}</q-item-label>
                    <q-item-label caption>Inspector/Supervisor</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <!--            Storage details-->
            <q-timeline-entry heading class="text-capitalize">
              <q-chip icon="oil_barrel">Storage details</q-chip>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="water"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvstDetails.jettyName }}</q-item-label>
                    <q-item-label caption>Jetty</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="factory"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvstDetails.depot }}</q-item-label>
                    <q-item-label caption>Depot</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="propane"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvstDetails.storageName }}</q-item-label>
                    <q-item-label caption>Storage</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(mvstDetails.qtyReceived)  }}   Metric Tons </q-item-label>
                    <q-item-label caption>Quantity Received( {{ this.convertUnit(mvstDetails.qtyReceived,'ton', mvstDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(mvstDetails.startTime) }}</q-item-label>
                    <q-item-label caption>Commence Discharge Time</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ this.humanDate(mvstDetails.completionTime) }}</q-item-label>
                    <q-item-label caption> Complete Discharge Time</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvstDetails.supervisorDestination }}</q-item-label>
                    <q-item-label caption>Inspector/Supervisor</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ mvstDetails.inspectorName }}</q-item-label>
                    <q-item-label caption>Report by</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="event"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(mvstDetails.createdAt) }}</q-item-label>
                    <q-item-label caption>Date submitted</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </q-card>
    </q-dialog>
<!--    view record dvst -->
    <q-dialog
      full-height
      content-class=" white-frost "
      v-model="dialog.dvstView"
      :position="position"
    >
      <q-card class="scroll fullscreen bg-white">
        <q-toolbar class="text-grey">
          <q-btn
            flat
            round
            color="grey"
            dense
            icon="chevron_left"
            v-close-popup
          />
          <q-avatar class="" color="purple"  text-color="white" icon="sailing"></q-avatar>
          <q-toolbar-title no-caps> Report </q-toolbar-title>
        </q-toolbar>
        <div
          class="q-pa-md q-mt-md q-mb-md text-grey text-left flex flex-center column q-gutter-y-md"
        >
          <q-timeline color="secondary">
            <q-timeline-entry
              title="Daughter Vessel to Storage"
              :subtitle="dvstDetails.id"
              color="orange"
              icon="receipt"
            >
              <div>
                {{ this.humanDate(dvstDetails.createdAt) }}
              </div>
              <div>
                {{ dvstDetails.inspectorName  }}
              </div>
              <div>
                {{ dvstDetails.staffId  }}
              </div>
            </q-timeline-entry>
            <!--            Dauughter vessel details-->
            <q-timeline-entry heading class="text-capitalize">
              <q-chip icon="directions_boat">Daughter vessel details</q-chip>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="sailing"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ dvstDetails.daughterVessel.vesselName }}</q-item-label>
                    <q-item-label caption>Daughter vessel</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="oil_barrel"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ dvstDetails.productName }}</q-item-label>
                    <q-item-label caption>Product</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(dvstDetails.order.expArrivalDate) }}</q-item-label>
                    <!--                    <q-item-label>{{ humanDate(dvstDetails.expArrivalDate) }}</q-item-label>-->
                    <q-item-label caption>Arrival Date</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(dvstDetails.qty) }} Metric ton</q-item-label>
                    <q-item-label caption>Quantity on Arrival ( {{ this.convertUnit(dvstDetails.qty,'ton', dvstDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(dvstDetails.qtyDischarged) }} Metric ton</q-item-label>
                    <q-item-label caption>Quantity Discharged ( {{ this.convertUnit(dvstDetails.qtyDischarged,'ton', dvstDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ dvstDetails.supervisorSource }}</q-item-label>
                    <q-item-label caption>Inspector/Supervisor</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <!--            Daughter vessel details-->
            <q-timeline-entry heading class="text-capitalize">
              <q-chip icon="oil_barrel">Storage details</q-chip>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="water"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ dvstDetails.jettyName }}</q-item-label>
                    <q-item-label caption>Jetty</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="factory"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ dvstDetails.depot }}</q-item-label>
                    <q-item-label caption>Depot</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="propane"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ dvstDetails.storageName }}</q-item-label>
                    <q-item-label caption>Depot</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="opacity"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ formatNumber(dvstDetails.qtyReceived)  }}   Metric Tons </q-item-label>
                    <q-item-label caption>Quantity Received( {{ this.convertUnit(dvstDetails.qtyReceived,'ton', dvstDetails.productName) }} Liters )</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(dvstDetails.startTime) }}</q-item-label>
                    <q-item-label caption>Commence Discharge Time</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="timer"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ this.humanDate(dvstDetails.completionTime) }}</q-item-label>
                    <q-item-label caption> Complete Discharge Time</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ dvstDetails.supervisorDestination }}</q-item-label>
                    <q-item-label caption>Inspector/Supervisor</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="engineering"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ dvstDetails.inspectorName }}</q-item-label>
                    <q-item-label caption>Report by</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item clickable>
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="event"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ humanDate(dvstDetails.createdAt) }}</q-item-label>
                    <q-item-label caption>Date submitted</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </q-card>
    </q-dialog>
<!--    storage-->
    <!--    Storage-->
    <q-dialog
      full-height
      content-class=" white-frost "
      v-model="dialog.stView"
      :position="position"
    >
      <q-card class="scroll fullscreen bg-white">
        <q-toolbar class="text-grey">
          <q-btn
            flat
            round
            color="grey"
            dense
            icon="chevron_left"
            v-close-popup
          />
          <q-avatar class="" text-color="white"  color="brown" icon="factory"></q-avatar>
          <q-toolbar-title no-caps> Report </q-toolbar-title>
        </q-toolbar>
        <div
          class="q-pa-md q-mt-md q-mb-md text-grey text-left flex flex-center column q-gutter-y-md"
        >
          <q-timeline color="secondary">
            <q-timeline-entry
              title="Storage "
              :subtitle="stDetails.orderId"
              color="orange"
              icon="receipt"
            >
              <div>
                {{ this.humanDate(stDetails) }}
              </div>
              <div>
                {{ stDetails.inspectorName  }}
              </div>
              <div>
                {{ stDetails.staffId  }}
              </div>
            </q-timeline-entry>
            <!--           Storage details-->
            <!--            <q-timeline-entry heading class="text-capitalize">-->
            <!--              {{ stDetails.depots.depotName  }}-->
            <!--            </q-timeline-entry>-->
            <q-timeline-entry  color="orange" class="text-capitalize">
              <q-item >
                <q-item-section top avatar>
                  <q-avatar
                    text-color="grey"
                    icon="oil_barrel"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ stDetails.productName }}</q-item-label>
                  <q-item-label caption>Product</q-item-label>
                </q-item-section>
              </q-item>
              <q-separator vertical inset />
            </q-timeline-entry>
            <q-timeline-entry color="orange"  class="">
              <q-item >
                <q-item-section top avatar>
                  <q-avatar
                    class="avartar"
                    text-color="green"
                    icon="oil_barrel"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ formatNumber(stDetails.openingStock) }} Metric ton</q-item-label>
                  <q-item-label caption>Open Stock ( {{ this.convertUnit(stDetails.openingStock,'ton', stDetails.productName) }} Liters ) </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator vertical inset />
            </q-timeline-entry>
            <q-timeline-entry color="orange"  class="text-capitalize">
              <q-item clickable>
                <q-item-section top avatar>
                  <q-avatar
                    text-color="grey"
                    icon="oil_barrel"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ stDetails.closingStock }} Metric ton</q-item-label>
                  <q-item-label caption>Close Stock ( {{ this.convertUnit(stDetails.closingStock,'ton', stDetails.productName) }} Liters ) </q-item-label>
                </q-item-section>
              </q-item>
              <q-separator vertical inset />
            </q-timeline-entry>
            <q-timeline-entry color="orange"  class="text-capitalize">
              <q-item clickable>
                <q-item-section top avatar>
                  <q-avatar
                    text-color="red"
                    icon="oil_barrel"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ stDetails.physicalStock }} Metric ton</q-item-label>
                  <q-item-label caption>Dead  Stock ( {{ this.convertUnit(stDetails.physicalStock,'ton', stDetails.productName) }} Liters ) </q-item-label>
                </q-item-section>
              </q-item>
            </q-timeline-entry>
            <q-timeline-entry color="orange" >
              <div>
                <q-item >
                  <q-item-section top avatar>
                    <q-avatar
                      class="avartar"
                      text-color="grey"
                      icon="oil_barrel"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ stDetails.storageName }}</q-item-label>
                    <q-item-label caption>Storage</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset />

              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>

      </q-card>
    </q-dialog>

    <!--    edit menu option-->
    <q-dialog v-model="dialog.menu" :position="position">
      <q-card class="bg-white menu q-ma-xs" style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <q-list>
            <q-item
              v-close-popup
              clickable
              v-ripple
              @click="viewreport(report), (dialog.view = !dialog.view)"
            >
              <q-item-section avatar>
                <q-icon color="grey" name="launch" />
              </q-item-section>
              <q-item-section>Open</q-item-section>
            </q-item>
            <q-item
              v-close-popup
              clickable
              v-ripple
              @click="(editreport = report), (dialog.edit = !dialog.edit)"
            >
              <q-item-section avatar>
                <q-icon color="grey" name="edit" />
              </q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!--    edit menu option-->
  </q-page>
</template>

<script>
const prd  = ''
export default {
  data() {
    return {
      stDetails:{

      },
      // mvdvDetails.order.expArrivalDate
      mvstDetails:{
        "motherVessel": {
          "vesselName":''
        },
        "daughterVessel": {
          "vesselName":''
        },
        "order":{
          "expArrivalDate": ""
        },
        "depot": {
          "depotName": "",
          "jettyName":""
        }
      },
      dvstDetails:{
        "daughterVessel": {
          "vesselName":''
        },
        "order":{
          "expArrivalDate": ""
        }
      },
      mvdvDetails:{
        "motherVessel": {
          "vesselName":''
        },
        "daughterVessel": {
          "vesselName":''
        },
        "order":{
          "expArrivalDate": ""
        }
      },
      className: ' stat-card radius-16 dark-frost q-pa-md text-weight-bold q-mt-sm bg-',
      reportTypes: [
        { reportTypeId:322332331, name: "Mother Vessel to Daughter vessel", source: "Mother Vessel", destination: "Daughter vessel", arrayName: "mvdv", tabName: "mv-dv", iconLeft: "directions_boat", iconRight: "sailing", color: "teal-10" },
        { reportTypeId:322332335, name: "Mother Vessel to Storage ", source: "Mother Vessel", destination: "Storage", arrayName: "mvst", tabName: "mv-st", iconLeft: "directions_boat", iconRight: "oil_barrel", color: "light-green-10" },
        { reportTypeId:322332332, name: "Daughter vessel to Storage", source: "Daughter Vessel", destination: "Storage", arrayName: "dvst", tabName: "dv-stg", iconLeft: "sailing", iconRight: "oil_barrel", color: "blue-grey-9" },
        { reportTypeId:322332334, name: "Storage", source: "Storage", destination: "Stock", arrayName: "st", tabName: "st", iconLeft: "oil_barrel", iconRight: "bar_chart", color: "blue-10" }
      ],
      tab: 'mv-dv',
      userSession: '',
      step: 1,
      optn: [],
      dateLoaded: false,
      position: "bottom",
      report: {
        "depots": {
          "depotName": " "
        }
      },
      reportMeta: '',
      dialog: {
        stView: false,
        dvstView: false,
        mvdvView: false,
        mvstView: false,
        menu: false,
        view: false,
        viewReport: false,
        new: false,
        edit: false,
      },
      mvdv: [],
      dvst: [],
      sttr: [],
      mvst: [],
      st: [],
      loading: false,
      noData: false,
      listContent: false,
      reports: [],
      data: [],
      stat: "",
    };
  },

  methods: {
    myDate (unformattedDate){
    },
    reportMenu(id) {
      this.report = id;
    },
    viewreport(id) {
      //assign the appropriate reportMeta for the dialog view
      for (let i = 0; i < this.reportTypes.length; i++) {
        if(id.reportTypeId==='322332331'){
          this.reportMeta = this.reportTypes[i]
        }
        else if (id.reportTypeId==='322332332'){
          this.reportMeta = this.reportTypes[i]

        }
        else if(id.reportTypeId==='322332333'){
          this.reportMeta = this.reportTypes[i]

        }
        else if (id.reportTypeId==='322332334'){
          this.reportMeta = this.reportTypes[i]
        }
      }
      this.report = id;
    },
    open(position) {
      this.position = position;
      this.dialog = true;
    },
    updateRecord(report) {
    },
    getData() {
      let  query = 'report/list'
      let url = "report/staff/"+this.userSession.staffId
      // get the report
      this.get(url)
        .then((response) => {
          this.data = response.data;
          this.reports = response.data.splice(0, 7);

          this.listContent = true;

          //  sort the data
          var count = 1;
          for (let i = 0; i < this.data.length; i++) {

            // report is from Mother vessel to daughter vessel
            if (this.data[i].reportTypeId === "322332331") {
              this.mvdv.push(this.data[i])
            }
            //  report is from daughter vessel to storage
            if (this.data[i].reportTypeId === "322332332") {
              // console.log(this.data[i])
              this.dvst.push(this.data[i])
            }
            //  storage
            if (this.data[i].reportTypeId === "322332334") {
              // console.log(this.data[i])
              this.st.push(this.data[i])
            }
            if (this.data[i].reportTypeId === "322332335") {
              // console.log(this.data[i])
              this.mvst.push(this.data[i])
            }

            // this.printmvdv.push({ sn: count++, id:this.data[i].id,mv:this.data[i].motherVesselName,dv:this.data[i].daughterVesselName, pdt:this.data[i].productName, qty:this.data[i].qty  })

          }
        })
        .catch((error) => {
          console.log(error);
          this.loading = !this.loading;
          // this.$q.notify({
          //   type: 'negative',
          //   message: 'No stats pulled'
          // })
          // return error
        });
    },
  },
  mounted () {
    // this.prd = this.$store.state.record.order.product;
    // console.log('Firebase cloud messaging object', this.$messaging)
    // console.log('The token', this.$messaging.getToken())
  },
  beforeMount() {
    this.userSession = this.getUserDetails();
    this.getData();
  }
};
</script>

<style scoped>
.list-card{
  background: #FFFFFF;
  border: 0.867647px solid rgba(123, 97, 255, 0.1);
  box-shadow: 0px 2.60294px 3.47059px rgba(0, 0, 0, 0.08);
  border-radius: 10.4118px;
}
.orange {
  position: absolute;
  width: 642.59px;
  height: 118.36px;
  left: 398px;
  top: 419px;

  background: #f2994a;
  mix-blend-mode: hard-light;
  border-radius: 8px;
}
.menu {
  border-radius: 24px 24px 24px 24px;
}
</style>

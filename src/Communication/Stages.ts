import {Client} from '../Network/Client';
import {Packets} from '../Network/Packets';
import { StageInfo } from '../Models';
import { promises, resolve } from 'dns';

export class Stages{
    public packet = new Packets();
    
    constructor(private client: Client){
    }

    async requestAudioSlots(groupID: number, subscribe?: boolean, callback?: (callback: StageInfo[]) => void){
        this.client.writePacket(this.packet.requestAudioSlots(groupID, subscribe), false, false, (resp: StageInfo[]) => {
            if(callback)
                callback(resp)
        });
    }

    async slotUpdate(groupID: number, slot: StageInfo, callback?: (callback) => void){
        this.client.writePacket(this.packet.slotUpdate(groupID, slot), true, true, (resp) => {
            if(callback)
                callback(resp)
        });
    }

    async broadcastTrack(groupID: number, slotID: number, sdp: string, callback?: (callback) => void){
        this.client.writePacket(this.packet.broadcast(groupID, slotID, sdp), false, false, (resp) => {
            if(callback)
                callback(resp)
        });   
    }

    async consume(groupID: number, slotID: number, sdp: string, callback?: (callback) => void){
        this.client.writePacket(this.packet.broadcast(groupID, slotID, sdp), false, false, (resp) => {
            if(callback)
                callback(resp)
        });
    }
}
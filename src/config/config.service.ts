import * as dotenv from 'dotenv';

export class ConfigService {
    private readonly envConfig: Record<string, string>;
    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    public async getPortConfig() {
        return this.get('PORT');
    }

    public getEncryptKey() {
        return 'secret';
    }

    public getJWTKey() {
        return 'secret';
    }

    public async getMongoConfig() {
        return {
            // uri: 'mongodb+srv://' + this.get('MONGO_USER') + ':' + this.get('MONGO_PASSWORD') + '@' + this.get('MONGO_HOST') + '/' + this.get('MONGO_DATABASE'),
            uri: 'mongodb://freeman:abcd1234@202.44.231.125:27014/wswh?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false',
            // mongosh "mongodb+srv://cluster0.lx2wdhp.mongodb.net/myFirstDatabase" --apiVersion 1 --username admin
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
    // public imagePath() {
    //     return {
    //         // userImagePath: 'http://localhost:3000/userImage',
    //         userImagePath: 'https://api-siamit-cleanup.flowmisite.com/userImage',
    //         resultAssessmentImagePath: 'https://api-siamit-cleanup.flowmisite.com/ResultImageAssessment',
    //         // resultAssessmentImagePath: 'http://localhost:3000/ResultImageAssessment',
    //     };
    // }

    // public lineCheckListEstimatePath() {
    //     return {
    //         // checkList: 'http://localhost:3000/result-assessment/createResultAssessment/checkList/?assessmentId=',
    //         checkList: 'https://siamit-cleanup.flowmisite.com/result-assessment/createResultAssessment/checkList/?assessmentId=',
    //         estimate: 'https://siamit-cleanup.flowmisite.com/result-assessment/createResultAssessment/estimate/?assessmentId=',
    //         // estimate: 'http://localhost:3000/result-assessment/createResultAssessment/estimate/?assessmentId=',
    //     };
    // }

    // public userIdPath() {
    //     return {
    //         userId: 'userId=',
    //     };
    // }

    // public zoneIdPath() {
    //     return {
    //         zoneId: 'zoneId=',
    //     };
    // }

    // public templateType() {
    //     return {
    //         templateType: 'templateType=',
    //     };
    // }
}

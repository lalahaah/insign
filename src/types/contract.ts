// 계약서 상태
export type ContractStatus = 'uploading' | 'parsing' | 'analyzing' | 'completed' | 'error';

// 계약서 카테고리
export type ContractCategory = 'Entertainment' | 'IT' | 'Other';

// 독소 조항 심각도
export type ClauseSeverity = 'high' | 'medium' | 'low';

// 비자 영향 상태
export type VisaImpactStatus = 'safe' | 'warning' | 'danger';

// 독소 조항 인터페이스
export interface ToxicClause {
    id: number;
    title_ko: string;
    title_en: string;
    severity: ClauseSeverity;
    original_text: string;
    standard_reference?: string;
    explanation_en: string;
    negotiation_script_ko?: string;
    isFreeSample: boolean;
}

// 비자 영향 인터페이스
export interface VisaImpact {
    status: VisaImpactStatus;
    reason_en: string;
}

// 분석 결과 인터페이스
export interface AnalysisResult {
    overallScore: number;
    summary: string;
    toxicClauses: ToxicClause[];
    visaImpact: VisaImpact;
}

// 계약서 인터페이스
export interface Contract {
    id: string;
    userId: string;
    filename: string;
    status: ContractStatus;
    category: ContractCategory;
    fileUrl?: string;
    overallScore?: number;
    uploadedAt: Date;
    completedAt?: Date;
    isPaid: boolean;
    analysis?: AnalysisResult;
    error?: string;
}

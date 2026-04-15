ELISA: An Interpretable Hybrid Generative AI Agent for Expression-Grounded Discovery in Single-Cell Genomics
Omar Coser
Department of Engineering, Unit of Artificial Intelligence and Computer Systems Università Campus Bio-Medico di Roma Via Alvaro del Portillo omarcoser10@gmail.com
Correspondence author: Omar Coser. This manuscript has been submitted for peer review.
Abstract
Translating single-cell RNA sequencing (scRNA-seq) data into mechanistic biological hypotheses remains a critical bottleneck, as agentic AI systems lack direct access to transcriptomic representations while expression foundation models remain opaque to natural language. Here we introduce ELISA (Embedding-Linked Interactive Single-cell Agent), an interpretable framework that unifies scGPT expression embeddings with BioBERT-based semantic retrieval and LLM-mediated interpretation for interactive single-cell discovery. An automatic query classifier routes inputs to gene marker scoring, semantic matching, or reciprocal rank fusion pipelines depending on whether the query is a gene signature, natural language concept, or mixture of both. Integrated analytical modules perform pathway activity scoringacross 60+ gene sets, ligand–receptor interaction prediction using 280+ curated pairs, condition-aware comparative analysis, and cell-type proportion estimation all operating directly on embedded data without access to the original count matrix. Benchmarked across six diverse scRNA-seq datasets spanning inflammatory lung disease, pediatric and adult cancers, organoid models, healthy tissue, and neurodevelopment, ELISA significantly outperforms CellWhisperer in cell type retrieval (combined permutation test, 
p
<
0.001
), with particularly large gains on gene-signature queries (Cohen’s 
d
=
5.98
 for MRR). ELISA replicates published biological findings (mean composite score 0.90) with near-perfect pathway alignment and theme coverage (0.98 each), and generates candidate hypotheses through grounded LLM reasoning, bridging the gap between transcriptomic data exploration and biological discovery. Code available at: https://github.com/omaruno/ELISA-An-AI-Agent-for-Expression-Grounded-Discovery-in-Single-Cell-Genomics.git (If you use ELISA in your research, please cite this work).

Keywords AI Agents, Single Cell Genomics, AI Discovery

1Introduction
Single-cell RNA sequencing (scRNA-seq) has transformed our understanding of cellular heterogeneity by enabling genome-wide transcriptional profiling at single-cell resolution Tang et al. (2009). Standardized analytical pipelines support quality control, normalization, clustering, differential expression, and trajectory inference Luecken and Theis (2019), catalyzing the construction of comprehensive cell atlases across tissues, developmental stages, and disease contexts. However a critical bottleneck persists: translating statistical outputs of differentially expressed gene lists, enriched pathways, and predicted ligand receptor interactions into mechanistic biological hypotheses remains labor-intensive, context-dependent, and difficult to scale or reproduce.

Large-language models (LLMs) offer a potential solution to this problem. LLMs encode substantial biomedical knowledge and perform competitively on clinical reasoning benchmarks Singhal et al. (2023), whereas retrieval-augmented generation (RAG) improves factual accuracy by grounding outputs in external knowledge at inference time Lewis et al. (2020). These capabilities have motivated agentic AI architectures that are capable of autonomous planning, tool usage, and iterative reasoning within closed-loop workflows.

Recent agentic systems span a broad range of biomedical applications (Table 1). Towards an AI Co-Scientist Gottweis et al. (2025) introduces multi-agent hypothesis generation through structured debate and evolutionary refinement, though it operates over textual knowledge without interfacing with experimental data. Biomni Huang et al. (2025) constructs a unified action space from biomedical tools and databases, enabling dynamic task orchestration including gene prioritization. GeneAgent Wang et al. (2025) and related systems Gao et al. (2024) extend LLM reasoning to gene-set analysis, whereas Virtual Lab Swanson et al. (2025) demonstrates collaborative multi-agent discovery. Within single-cell analysis, CellAgent Xiao et al. (2024) decomposes scRNA-seq workflows into agent-handled subtasks, AutoBA Zhou et al. (2023) generates executable pipelines from natural language, and BRAD Pickard et al. (2025) integrates LLMs with enrichment analysis for biomarker identification. In retrieval-augmented space, GeneGPT Jin et al. (2025) provides structured access to NCBI databases, and systems for deep phenotyping Garcia et al. (2025) and biomedical data extraction Cinquin (2024); Niyonkuru et al. (2025) have demonstrated the utility of RAG for factual grounding. CRISPR-GPT Qu et al. (2025) further illustrates agentic automation for gene-editing experiment design. However, these systems are primarily responsible for curated text and structured databases and lack the capacity to operate directly on high-dimensional transcriptomic representations.

Concurrently, foundation models for single-cell biology have achieved remarkable progress in the learning of expressive latent representations from transcriptomic data. scGPT Cui et al. (2024) employs generative pre-training over millions of single-cell transcriptomes, capturing gene-gene dependencies for cell embedding, annotation transfer, and perturbation prediction. Extensions such as scWGBS-GPT Liang et al. (2025) and Tokensome Zhang et al. (2024) broaden learned representations to methylomics and multimodal settings. However, these expression embeddings are not designed for semantic querying; they capture transcriptional similarity in latent spaces that lack alignment with the natural language concepts that biologists use to formulate hypotheses. Notably, the CellWhisperer Schaefer et al. (2025) addressed part of this gap by learning joint embeddings of transcriptomes and textual annotations via contrastive training, enabling chat-based interrogation of scRNA-seq data within CELLxGENE Schaefer et al. (2025). While this establishes a compelling proof of concept for natural-language exploration, it does not incorporate built-in analytical modules for pathway scoring, interaction prediction, or condition-aware comparison.

Table 1:Comparison of existing AI systems for biomedical and single-cell analysis. Expr. Emb.: uses expression-derived embeddings from foundation models; Sem. Ret.: semantic retrieval over biological annotations; L–R / Pathway: ligand–receptor interaction and pathway scoring from data; Cond. Comp.: condition-aware comparative analysis; Interp. Report: automated interpretive report generation with LLM.
System	Expr.	Sem.	L–R /	Cond.	Interp.	Primary
Emb.	Ret.	Pathway	Comp.	Report	Scope
AI Co-Scientist Gottweis et al. (2025) 	–	–	–	–	✓	Hypothesis generation
Biomni Huang et al. (2025) 	–	✓	–	–	–	General biomedical
GeneAgent Wang et al. (2025) 	–	✓	–	–	–	Gene-set analysis
Virtual Lab Swanson et al. (2025) 	–	–	–	–	✓	Multi-agent discovery
CellAgent Xiao et al. (2024) 	–	–	–	–	–	scRNA-seq pipelines
AutoBA Zhou et al. (2023) 	–	–	–	–	–	Pipeline generation
BRAD Pickard et al. (2025) 	–	✓	–	–	–	Biomarker ID
GeneGPT Jin et al. (2025) 	–	✓	–	–	–	Database querying
CRISPR-GPT Qu et al. (2025) 	–	–	–	–	–	Experiment design
scGPT Cui et al. (2024) 	✓	–	–	–	–	Cell embeddings
CellWhisperer Schaefer et al. (2025) 	✓	✓	–	–	–	Multimodal embedding
ELISA (ours)	✓	✓	✓	✓	✓	Interactive sc discovery
This landscape reveals a fundamental disconnect: agentic systems and LLM-based tools excel at reasoning over text and generating interpretations but lack direct access to transcriptional data structure, while expression foundation models learn rich cellular representations that remain opaque to natural language interfaces. No existing system has unified expression-derived embeddings with semantic language representations within a single interactive framework for single-cell discovery.

ELISA (Embedding-Linked Interactive Single-cell Agent) addresses this gap by integrating scGPT expression embeddings with semantic retrieval (sr) and LLM-based biological interpretation in a unified discovery platform (Fig. 1). Rather than retraining the expression foundation models, ELISA treats scGPT cluster embeddings as an expression-side representation that is explicitly combined with BioBERT-derived semantic embeddings through an automatic hybrid routing mechanism. A query classifier detects whether the input is a gene signature, a natural language concept, or a mixture of both, and routes it to the appropriate retrieval pipeline gene marker scoring, semantic cosine similarity, or reciprocal rank fusion of both enabling flexible navigation across the full spectrum of biological queries. Built-in analytical modules for condition-aware comparative analysis, ligand-receptor interaction prediction, pathway activity scoring, and cell-type proportion analysis operate directly on the embedded data, while an LLM reasoning layer translates statistical outputs into structured biological interpretations. Critically, ELISA enforces strict separation between dataset-derived evidence and LLM-generated knowledge, enabling transparent hypothesis generation. The system produces comprehensive, publication-ready reports with Nature-style visualizations, supporting the full arc from exploratory query to structured scientific output.

Refer to caption

Figure 1:Overview of the ELISA architecture. The framework comprises three stages. In data preparation (left), a single-cell dataset undergoes standard preprocessing (normalization, log-transform, highly variable gene selection, PCA, neighbor graph construction, and Leiden clustering), after which per-cluster differential expression statistics are computed, enriched with Gene Ontology (GO) and Reactome terms, and encoded into 768-dimensional semantic embeddings via BioBERT. In parallel, cell-level expression embeddings are generated through scGPT. Both representations are fused into a single serialized embedding file (.pt). In the retrieval and analysis stage (center), a query classifier routes user input—gene signatures, natural language concepts, or mixed queries—to the appropriate pipeline: gene marker scoring, semantic retrieval, or hybrid retrieval via reciprocal rank fusion (RRF). Additional analytical modules perform pathway scoring, ligand–receptor interaction prediction, comparative analysis, and proportion estimation directly on the embedded data. In the interpretation stage (right), all retrieval and analysis outputs are passed to a Groq-hosted LLM (LLaMA 3.1-8B) that generates grounded biological interpretations and structured reports.
We validated the ELISA on five diverse scRNA-seq datasets spanning distinct tissues, disease contexts, and experimental designs. Through a systematic comparison with published findings, we demonstrate that ELISA recovers key biological signals differentially expressed genes, altered cell-type proportions, pathway activities, and cell cell interaction networks with high fidelity. A quantitative evaluation framework comprising five complementary metrics (gene coverage, interaction recovery, pathway alignment, proportion consistency, and qualitative theme coverage) provides a principled assessment of the capacity of the system to replicate established biological conclusions. To the best of our knowledge, scGPT embeddings have not been integrated with semantic language representations in a query-conditioned retrieval framework for single-cell genomics.

In summary, this work makes the following contributions:

• Multimodal discovery agent for single-cell genomics. We introduce ELISA, an interpretable AI framework that integrates transcriptomic embeddings, semantic knowledge retrieval, and large language model reasoning to enable natural-language–driven exploration and biological discovery from single-cell RNA sequencing data.
• Query-adaptive hybrid retrieval architecture. ELISA employs automatic query classification and dynamic pipeline routing to combine complementary retrieval strategies including gene marker scoring, semantic similarity search, and reciprocal rank fusion allowing flexible, query-conditioned navigation of complex cellular landscapes.
• Integrated biological analysis modules for expression-grounded reasoning. The system incorporates analytical components for comparative expression analysis, ligand–receptor interaction scoring, pathway activity estimation, and cell-type proportion profiling, enabling automated interpretation and contextualization of discovered signals.
• Benchmarking framework for evaluating AI-assisted biological discovery. We propose a quantitative evaluation strategy that measures the ability of AI agents to recover biologically meaningful findings reported in reference studies, and apply this framework across six diverse scRNA-seq datasets.
• Empirical validation of discovery performance. Across multiple datasets and evaluation metrics, ELISA consistently recovers the majority of key biological signals reported in the corresponding studies, demonstrating its potential to support interpretable and reproducible AI-assisted discovery in single-cell genomics.
2Materials and Methods
Detail about parameters and hyperparameters and software are specified in appendix 6,F.8. Detail about dataset are in E,5. Detail about the method are in F.

2.1Datasets
ELISA was validated on six publicly available scRNA-seq datasets from CZ CELLxGENE Discover (Table 5), spanning lung (cystic fibrosis)Berg et al. (2025), adrenal tumor (neuroblastoma)Yu et al. (2025), multi-cancer immune checkpoint blockadeGondal et al. (2025), lung organoid Lim et al. (2025), healthy breast tissueBhat-Nakshatri et al. (2024), and first-trimester brainMannens et al. (2025). Datasets were downloaded in AnnData format and preprocessed into a standardized embedding format. Cell type annotations from the original publications were retained without modification.

2.2System architecture
ELISA integrates four modules a hybrid retrieval engine, an analytical suite, a visualization toolkit, and an LLM chat interface operating on a shared serialized PyTorch embedding file per dataset. Each embedding file stores cluster identifiers, BioBERT semantic embeddings (768-d), optional scGPT expression embeddings, per-cluster differential expression statistics, gene ontology (GO) and Reactome enrichment terms, and metadata. This cluster-level representation eliminates the need for access to the original count matrix at query time.

2.3Hybrid retrieval
An automatic query classifier routes each input to one of the three pipelines based on token-level heuristics. Gene queries (
≥
60% gene-symbol tokens) were scored against per-cluster Differential Expression (DE) profiles using a weighted function of 
|
log
2
⁡
FC
|
 and expression specificity (
pct
in
−
pct
out
). Ontology queries are encoded with BioBERTLee et al. (2020) and matched to precomputed cluster description embeddings via cosine similarity, augmented by Cell Ontology name boosting (
α
=
0.15
) and synonym expansion (
β
=
0.10
). Mixed queries are resolved through reciprocal rank fusion (RRF) of both pipelines (
k
=
60
). For benchmarking, an additive union strategy selects the higher-recall modality as primary and appends unique results from the secondary pipeline.

2.4Analytical modules
The four built-in modules operate directly on the embedded data. Ligand–receptor interaction prediction scores source–target cluster pairs using a curated database of 280+ pairs compiled from CellChatJin et al. (2025), CellPhoneDBEfremova et al. (2020), and NicheNetBrowaeys et al. (2020). Pathway activity scoring quantifies 60+ curated gene sets across five categories (immune signaling, cell biology, neuroscience, metabolism and tissue-specific). Comparative analysis stratifies clusters by condition metadata and identifies condition-biased gene expression. Proportion analysis computes per-cluster cell fractions and condition-specific fold changes. Detailed description in F.3.

2.5LLM interpretation
Retrieval and analysis outputs are interpreted by LLaMA-3.1-8B-Instant Grattafiori et al. (2024) via the Groq API (temperature 0.2)(free to use with token limit, API of chatGPT Achiam et al. (2023), gemini Team et al. (2023) and claude Anthropic (2024) are integrated and ready to use). Prompts enforce strict grounding in dataset evidence, with explicit instructions to avoid hallucination and causal claims. A discovery mode generates structured outputs comprising dataset evidence, established biology, consistency analysis, and candidate hypotheses.

2.6Benchmarking
Retrieval was evaluated using 100 queries (50 ontology, 50 expression) with curated expected clusters, assessed using Cluster Recall@
k
 and Mean Reciprocal Rank (MRR). ELISA was compared against a CellWhisperer Schaefer et al. (2025). Analytical modules were evaluated against ground truth from source publications using interaction recovery rate, pathway alignment, proportion consistency, and gene recall. A combined permutation test (50,000 permutations) assessed overall significance across all metrics simultaneously.

3Results
3.1ELISA’s hybrid retrieval outperforms CellWhisperer across datasets and query types
To evaluate the ability of ELISA to retrieve biologically relevant cell types from single-cell atlases, we benchmarked its retrieval performance against CellWhisperer Schaefer et al. (2025), a state-of-the-art multimodal framework for natural-language interrogation of scRNA-seq data. For each of the six datasets (Table 5), we designed paired sets of ontology queries (concept-level, e.g., “macrophage infiltration in CF (Cystic Fibrosis) airways”) and expression queries (gene-signature-based, e.g., “MARCO FABP4 APOC1 C1QB C1QC MSR1”), with curated expected cluster sets derived from the corresponding reference publications. We evaluated four retrieval modes: CellWhisperer, Semantic ELISA, scGPT ELISA (gene marker scoring pipeline), and ELISA Union (additive fusion of semantic and gene pipelines via adaptive routing). Performance was assessed using Cluster Recall@
k
 and Mean Reciprocal Rank (MRR) across both query categories (Fig. 2; formal definitions of all retrieval and analytical evaluation metrics are provided in Supplementary Section C).

Refer to caption

Figure 2:ELISA outperforms CellWhisperer across six datasets and both query types. Radar plots showing retrieval performance on ontology (Ont) and expression (Exp) queries for each dataset. Each plot displays six axes: Cluster Recall@
k
 at two dataset-adapted cutoffs and Mean Reciprocal Rank (MRR), evaluated separately on ontology and expression queries (see Supplementary Section C for metric definitions). Higher values (further from center) indicate better performance. Four retrieval modes are compared: CellWhisperer (pink dashed), ELISA Semantic (blue), ELISA scGPT (orange), and ELISA Union (green). The Union mode consistently achieves the largest radar footprint, matching or exceeding CellWhisperer on ontology metrics while substantially outperforming it on expression metrics. ELISA Union significantly outperformed CellWhisperer across all datasets and metrics (combined permutation test, 
p
<
0.001
; see Table 2).
Across all six datasets, the ELISA mode consistently achieved the highest or near-highest performance on every metric, enveloping or matching the CellWhisperer profile on all axes of the radar plots (Fig. 2). To quantify this advantage, we performed paired statistical tests across the six datasets for each retrieval metric (Table 2). A combined permutation test aggregating all 12 metrics simultaneously confirmed that ELISA Union significantly outperformed CellWhisperer (
p
<
0.001
; 50,000 permutations). This overall advantage was driven by large improvements on expression queries (mean 
Δ
MRR = +0.41, paired 
t
-test 
p
<
0.001
, Cohen’s 
d
 = 5.98; mean 
Δ
Recall@5 = +0.29, 
p
=
0.006
, 
d
 = 1.57) and consistent gains on ontology queries (mean 
Δ
MRR = +0.15, 
p
=
0.028
, 
d
 = 1.02; mean 
Δ
Recall@5 = +0.08, 
p
=
0.047
, 
d
 = 0.84). Across all six datasets, the ELISA Union won 46 of 54 individual metric comparisons against CellWhisperer, with no dataset in which CellWhisperer held an overall advantage. The Semantic ELISA pipeline alone also significantly outperformed CellWhisperer (combined permutation test, 
p
=
0.003
), as did the scGPT pipeline (
p
=
0.023
), confirming that both modalities independently contribute retrieval value beyond the CellWhisperer baseline.

Table 2:Statistical comparison of ELISA Union vs. CellWhisperer retrieval performance. For each metric, 
Δ
 mean reports the average improvement of Union over CellWhisperer across datasets. Cohen’s 
d
 is the paired effect size. 
p
-values are from one-sided paired 
t
-tests (
H
1
: Union 
>
 CellWhisperer). Sign indicates datasets where Union outperformed CellWhisperer. Metrics with fewer than 6 datasets reflect different Recall@
k
 cutoffs used per dataset (see Supplementary Section B). The combined permutation test (
p
<
0.001
) aggregates all metrics simultaneously.
Category	Metric	
Δ
 mean	Cohen’s 
d
p
 (paired 
t
)	Sign (W/L)	
n
Expression	MRR	+0.409	5.98	
<
0.001	6/6	6
Expression	Recall@5	+0.287	1.57	0.006	5/5	5
Expression	Recall@3	+0.428	5.38	0.006	3/3	3
Expression	Recall@2	+0.492	3.43	0.014	3/3	3
Expression	Recall@1	+0.442	1.84	0.043	3/3	3
Expression	Recall@10	+0.284	1.43	0.065	3/3	3
Ontology	MRR	+0.152	1.02	0.028	5/6	6
Ontology	Recall@5	+0.078	0.84	0.047	4/5	5
Ontology	Recall@10	+0.113	2.46	0.025	3/3	3
Ontology	Recall@1	+0.086	0.61	0.199	2/3	3
Ontology	Recall@2	+0.046	0.73	0.166	2/3	3
Ontology	Recall@3	+0.032	0.80	0.150	2/3	3
Combined (all 12 metrics)	+0.237	—	
<
0.001
†
46/54
‡
6
†
Combined permutation test (50,000 permutations). 
‡
Total metric-level wins across all datasets.
A key observation is that no single retrieval modality dominated across both query types. The Semantic pipeline consistently excelled on ontology queries, where biological concept matching benefits from BioBERT’s language understanding, synonym expansion, and Cell Ontology name boosting. In contrast, the gene marker scoring pipeline showed its strongest performance on expression queries, where matching transcriptomic signatures to cluster DE profiles is essential. This complementarity was particularly pronounced in the CF Airways dataset, where the Semantic pipeline achieved high ontology Recall@10 (
∼
0.95) but lower expression recall, while the gene pipeline showed the inverse pattern. Similar modality-specific advantages were visible across all datasets: in the Breast Tissue Atlas, Semantic and Union nearly overlapped on ontology metrics while the gene pipeline lagged; in Immune Checkpoint Blockade (ICB) Multi-Cancer, the gene pipeline outperformed Semantic on expression MRR while underperforming on ontology axes.

CellWhisperer showed competitive performance on ontology queries in several datasets, particularly CF Airways and High-Risk Neuroblastoma, where its ontology MRR approached that of the ELISA Semantic pipeline. However, CellWhisperer’s performance dropped substantially on expression queries across all six datasets, with a mean MRR of 0.397 
±
 0.049 compared to 0.806 
±
 0.061 for ELISA Union a twofold difference (Table 2) Cohen (2013); Casella and Berger (2024). This gap was most severe in the ICB Multi-Cancer and First-Trimester Brain datasets, where CellWhisperer’s expression recall fell well below both ELISA pipelines. The expression query deficit reflects a fundamental architectural difference: CellWhisperer’s contrastive text transcriptome alignment is optimized for natural-language cell type descriptions but does not incorporate a dedicated gene marker scoring mechanism for queries formulated as gene signatures, a query type that is common in exploratory single-cell analysis.

The ELISA Union mode resolves the tension between ontology and expression retrieval through its adaptive routing mechanism. For each query, the automatic classifier identifies whether the input is a gene list, a natural-language concept, or a mixture, and routes it to the appropriate pipeline. The additive union strategy then combines the full ranked output of the primary pipeline with unique clusters from the secondary pipeline, ensuring that relevant cell types captured by either modality are not lost. This yielded consistent gains: in the CF Airways dataset, Union achieved a larger and more balanced radar footprint than any single modality; in the Breast Tissue Atlas, Union matched the near-perfect ontology performance of Semantic while substantially improving expression recall; and in the First-Trimester Brain, Union compensated for Semantic’s lower expression scores by incorporating the gene pipeline’s matching strength.

Notably, the performance advantage of ELISA was robust across datasets with very different structural properties. The CF Airways dataset (30 cell types, casecontrol design) and the First-Trimester Brain atlas (160 clusters, developmental trajectory without disease contrast) represent opposite ends of the complexity spectrum, however the ELISA Union outperformed CellWhisperer in both settings. Similarly, the ICB Multi-Cancer dataset, which integrates nine cancer types across 223 patients, poses a challenging retrieval scenario owing due to its heterogeneous cell type nomenclature, yet ELISA maintains its performance advantage.

In summary, ELISA’s hybrid retrieval architecture combining semantic language matching, gene marker scoring, and adaptive fusion provides a significantly superior retrieval framework compared to text-only multimodal approaches (combined permutation test, 
p
<
0.001
). The systematic advantage on expression queries, where dedicated gene scoring compensates for the limitations of language-only embeddings (Cohen’s 
d
 = 5.98 for MRR), establishes that both retrieval modalities contribute essential and non-redundant information for comprehensive single-cell atlas interrogation.

3.2ELISA replicates key biological findings across six diverse datasets
To evaluate whether ELISA could recover published biological conclusions through automated analysis alone, we compared ELISA-generated reports with the main-text results of six reference publications (Table 5). For each dataset, ELISA was provided only with the preprocessed embedding file and no prior knowledge of the expected findings. We assessed replication across five quantitative metrics: gene coverage, pathway alignment, interaction recovery, proportion consistency, and theme coverage, and obtained an independent domain expert evaluation score (Table 3).

Across all six datasets, ELISA achieved a mean composite score of 0.90 (range 0.82–0.96). Pathway alignment and theme coverage were near-perfect (mean 0.98 each), while gene coverage averaged 0.85 and interaction recovery 0.77. Independent biological evaluation scores (mean 0.88) confirmed strong agreement with published findings. The computation of these metrics is presented in the appendix B.

Airways with Cystic fibrosis.
ELISA was used to recover the major epithelial and immune cell populations, as described by Berg et al. Berg et al. (2025), including correct proportion shifts and IFN-
γ
/type I interferon programs (pathway alignment: 1.0). Gene coverage reached 0.80, capturing markers such as IFNG, CD69, and HLA-E. Interaction recovery was 0.20, reflecting partial detection of the HLA-E/NKG2A and CALR–LRP1 axes (composite: 0.82).

High-risk neuroblastoma.
ELISA identified all major cellular compartments and correctly detected the HB-EGF/ERBB4 paracrine axis (interaction recovery: 1.00) as described by Yu et al. Yu et al. (2025). Pathway alignment was perfect and with mTOR, MAPK, and ErbB programs identified. Gene coverage was 0.84, with partial recovery of therapy-induced markers (composite: 0.95).

Immune checkpoint blockade across cancers.
Using the ICB dataset, Gondal et al. Gondal et al. (2025), ELISA captured checkpoint molecules (CD274, PDCD1, CTLA4), exhaustion markers, and all major ligand–receptor axes including PD-L1/PD-1 and TIGIT/NECTIN2 (gene coverage: 0.77; pathway and interaction recovery: 1.00; composite: 0.93).

Healthy breast tissue atlas.
ELISA achieved its highest composite score (0.96) on the dataset of Bhat-Nakshatri et al. Bhat-Nakshatri et al. (2024), accurately resolving the epithelial hierarchy with a gene coverage of 0.96, perfect pathway alignment, and interaction recovery of 0.80. Ancestry-related transcriptional programs were not captured, reflecting a limitation of ELISA’s pathway-centric framework.

Fetal lung Alveolar Type (AT2) organoids.
ELISA achieved perfect gene coverage (1.00) on the dataset of Lim et al. Lim et al. (2025), detecting all canonical surfactant genes and correctly identifying surfactant metabolism, Wnt, and Fibroblast Growth Factor (FGF) programs. Interaction recovery was lower (0.40), as SFTPC trafficking mechanisms were outside transcriptomic scope (composite: 0.91).

First-trimester human brain.
Despite operating solely on the transcriptomic component of this multimodal atlas Mannens et al. (2025), ELISA identified major neuronal populations with gene coverage of 0.85 and perfect pathway and interaction recovery. Chromatin accessibility analyses were correctly identified as outside scope (composite: 0.95).

Summary.
ELISA demonstrated robust replication across all six datasets (mean composite 0.90), with the strongest performance for pathway-level and thematic interpretation (
≥
0.98 mean). Gene coverage was high but not exhaustive (0.85), with missed genes primarily in rare cell states and non-transcriptomic modalities.

Table 3:Quantitative comparison between ELISA reports and reference single-cell studies. Scores reflect agreement between ELISA-generated biological interpretations and findings described in the main text of the corresponding publications. Gene coverage, pathway alignment, interaction recovery, and proportion consistency were computed programmatically; theme coverage was assessed independently by a domain expert as described in Section D.
Dataset	Gene	Path.	Int.	Prop.	Theme	Comp.
Cov.	Align.	Rec.	Cons.	Cov.	score
CF airway	0.80	1.0	0.20	Yes	0.85	0.82
Neuroblastoma	0.84	1.00	1.00	Yes	0.88	0.95
ICB Multi-Cancer	0.77	1.00	1.00	Yes	0.91	0.93
Breast Atlas	0.96	1.00	0.80	Yes	0.89	0.96
Fetal Lung AT2	1.00	1.00	0.40	Yes	0.88	0.91
Brain Atlas	0.85	1.00	1.00	Yes	0.90	0.95
Mean	0.85	1.00	0.77	6/6	0.88	0.90
 
Gene Cov.: gene coverage; Path. Align.: pathway alignment; Int. Rec.: interaction recovery; Prop. Cons.: proportion consistency; Theme Cov.: theme coverage; Biol. Eval.: independent domain expert evaluation score (0–1). Comp. score: unweighted mean of all preceding metrics (Prop. Cons. coded as 1.0 when consistent).

3.3Discovery of candidate regulatory signals across tissue atlases
Beyond reproducing the key biological signals described in the original studies, ELISA’s discovery mode highlighted several candidate regulatory signals that were not explicitly emphasized in the reference publications (Table 4). These signals represent transcriptome-derived hypotheses emerging from systematic cross-cell-type analysis of single-cell atlases.

In the cystic fibrosis airway dataset, ELISA identified enrichment of the CALR–LRP1 phagocytic signaling axis within the macrophage populations. Calreticulin–LRP1 signaling has previously been implicated in apoptotic cell recognition and clearance, suggesting that altered macrophage-mediated phagocytosis may contribute to the inflammatory microenvironment characteristic of the CF lung.

Within the fetal lung atlas, ELISA detected increased expression of the ubiquitin-associated regulators TRIM21 and TRIM65 in alveolar type II (AT2) cells alongside the known E3 ubiquitin ligase ITCH. Although ITCH has been implicated in regulating surfactant protein C (SFTPC) maturation, the enrichment of these additional TRIM-family ligases suggests that cooperative ubiquitin-dependent pathways may participate in surfactant protein processing and AT2 cell proteostasis.

In the healthy breast tissue atlas, ELISA highlighted strong enrichment of the Kelch-family gene KLHL29 within basal–myoepithelial cell populations. Although not emphasized in the original study, this pattern suggests that KLHL29 may represent a previously unrecognized marker or structural regulator of basal epithelial identity.

Analysis of the immune checkpoint blockade dataset revealed elevated expression of macrophage markers CD163 and MRC1 within tumor-associated macrophage populations following therapy. This expression pattern is consistent with an M2-like macrophage polarization state, potentially reflecting remodeling of the immune microenvironment in response to checkpoint blockade treatment.

In the neuroblastoma dataset, ELISA identified differential usage of AP-1 transcription factors across treatment states. Specifically, JUND expression was enriched at diagnosis, whereas JUNB and FOS were more strongly expressed after therapy. This shift suggests dynamic remodeling of AP-1–mediated stress-response programs during therapy-induced tumor state transitions.

Finally, analysis of the developing brain atlas revealed a shared transcription factor module composed of TFAP2B, LHX5, and LHX1 across Purkinje neurons and midbrain GABAergic neuronal populations. This co-occurring regulatory signature suggests the existence of a conserved transcriptional program underlying inhibitory neuron specification in anatomically distinct brain regions.

Taken together, these findings illustrate how ELISA can surface candidate regulatory programs across diverse single-cell atlases. While these signals should be interpreted as transcriptome-derived hypotheses, they provide potential starting points for targeted functional validation.

These signals should be interpreted as transcriptome-derived hypotheses and may serve as the starting points for targeted experimental validation.

Table 4:Candidate regulatory signals identified by ELISA across six reference single-cell atlases. These signals were not explicitly highlighted in the original publications and represent transcriptome-derived hypotheses generated through ELISA’s discovery mode.
Dataset
 	
Primary finding in reference study
ELISA candidate discovery / hypothesis
CF airway
 	
Altered immune–structural cell crosstalk and inflammatory signaling in cystic fibrosis airway tissue
Detection of the macrophage CALR–LRP1 signaling axis, suggesting altered apoptotic cell recognition or phagocytic clearance pathways contributing to the CF lung inflammatory microenvironment
Breast Atlas
 	
Ancestry-associated epithelial lineage variation and luminal progenitor states in healthy breast tissue
Enrichment of the Kelch-family gene KLHL29 in basal–myoepithelial cells, suggesting a potential additional marker or regulator of basal epithelial structural identity
Fetal Lung AT2
 	
ITCH-mediated ubiquitin-dependent regulation of surfactant protein C (SFTPC) maturation in alveolar type II cells
Upregulation of TRIM21 and TRIM65 in mature AT2 cells, suggesting additional TRIM-family ubiquitin ligases may participate in surfactant protein processing and proteostasis
ICB Multi-Cancer
 	
Tumor and immune transcriptional responses associated with immune checkpoint blockade therapy
Elevated CD163 and MRC1 expression in tumor-associated macrophages, consistent with an M2-like polarization state potentially associated with therapy-induced immune remodeling
Neuroblastoma
 	
Therapy-induced transcriptional rewiring of tumor cell states and microenvironment interactions
Differential AP-1 transcription factor usage, with JUND enriched at diagnosis and JUNB/FOS enriched post-treatment, suggesting stress-response remodeling during therapy-induced state transitions
Brain Development Atlas
 	
Chromatin accessibility programs defining early neuronal lineage specification
Shared transcription factor module (TFAP2B, LHX5, LHX1) across Purkinje neurons and midbrain GABAergic populations, suggesting a conserved regulatory program for inhibitory neuron specification
 
4Discussion
In this study we introduced ELISA, an agent-based framework that unifies semantic language retrieval, gene marker scoring, and LLM-mediated biological interpretation for interactive single-cell atlas interrogation. Systematic evaluation across six diverse datasets demonstrated that ELISA significantly outperforms CellWhisperer in cell type retrieval (combined permutation test, 
p
<
0.001
) and faithfully replicated published biological findings with a mean composite score of 0.90. Here we discuss the implications of these results for the design of retrieval systems in single-cell genomics, the limitations of contrastive multimodal alignment, and broader role of agentic AI in biological discovery.

Contrastive alignment produces text-dominated embeddings.
A central finding of this study is the striking asymmetry in CellWhisperer performance across query types. In ontology queries natural language descriptions of cell types and biological processes CellWhisperer performed competitively with ELISA’s Semantic pipeline, achieving mean ontology MRR values within 0.15 of ELISA Union across most datasets (Table 2, Fig. 2). This is expected: CellWhisperer’s CLIP-style contrastive training aligns transcriptome embeddings with textual descriptions, and ontology queries directly exploit this text-side alignment. However, on expression queries where users provide gene signatures rather than natural language CellWhisperer’s performance collapsed, with expression MRR averaging 0.397 compared to 0.806 for ELISA Union, a twofold deficit (Cohen’s 
d
 = 5.98).

This asymmetry reveals a fundamental limitation of contrastive multimodal alignment for single-cell retrieval. CLIP-style training optimizes for text transcriptome correspondence by learning a shared embedding space where matching text cell pairs are close and mismatched pairs are distant. The resulting embeddings are, by construction, shaped primarily by the textual supervision signal: the model learns to position transcriptomes near their text descriptions, but the fine-grained transcriptomic structure which genes are differentially expressed, at what fold changes, in what fraction of cells is compressed into a representation optimized for text matching rather than gene-level querying. When a user submits a gene signature such as “MARCO FABP4 APOC1 C1QB C1QC MSR1”, these gene names are processed as text tokens rather than matched against differential expression statistics, resulting in a retrieval signal that is weaker and less specific than direct marker scoring.

This observation has broader implications than those of ELISA and CellWhisperer. As foundation models for single-cell biology increasingly adopt contrastive or multimodal pretraining objectives, our results caution that text-supervised alignment may inadvertently sacrifice expression-level specificity. The dual-query evaluation framework introduced here requiring systems to perform well on both ontology and expression queries provides a principled diagnostic for detecting such modality imbalances.

Explicit routing outperformed implicit fusion.
ELISA’s architectural response to this challenge was to avoid implicit embedding fusion altogether. Rather than learning a single shared space that must simultaneously serve text and expression queries, ELISA maintains two separate representation spaces BioBERT semantic embeddings and gene-level DE statistics, and routes queries to the appropriate pipeline through explicit classification. The query classifier, operating on simple token-level heuristics (gene name patterns, known vocabulary membership, natural language indicators), achieved reliable routing across all six datasets without requiring any training data.

This design choice is supported empirically by complementarity analysis: the semantic pipeline won ontology queries, while the gene marker scoring pipeline won on expression queries in every dataset, with minimal overlap in their error profiles. The additive union strategy, which selects the better-performing modality as the primary and appends unique results from the secondary, captures the strengths of both pipelines without the compression artifacts inherent in learned fusion. The result was a system that matched or exceeded the best single modality on every metric across every dataset a property that no implicit fusion method could guarantee.

Analytical modules bridge retrieval and interpretation.
A distinguishing feature of ELISA relative to prior retrieval-focused systems is the integration of downstream analytical modules pathway scoring, ligand receptor interaction prediction, comparative analysis, and proportion estimation that operate directly on the same embedded data representation used for retrieval. This design enables a seamless transition from “which cell types are relevant?” (retrieval) to “what biological programs are active in these cell types?” (analysis) to “what does this mean biologically?” (LLM interpretation), all within a single interactive session.

The near-perfect pathway alignment (mean 0.98) and theme coverage (mean 0.88) scores across all six datasets demonstrated that this integrated architecture effectively connects gene-level evidence to biological programs. In contrast, systems that perform retrieval alone including CellWhisperer, require users to manually extract gene lists from retrieved clusters and perform separate pathway and interaction analyses using external tools, introducing friction and potential inconsistencies.

The interaction recovery metric (mean 0.77) was the most variable across datasets, with perfect recovery in neuroblastoma, ICB, and brain datasets but lower recovery in cystic fibrosis (0.40) and fetal lung (0.40). These lower scores primarily reflect the inherent difficulty of predicting specific ligand–receptor pairs from expression data when the ligand or receptor is expressed at moderate levels across multiple cell types, making the interaction statistically detectable but not highly ranked. Future work could address this by incorporating spatial proximity information or protein-level data to improve the interaction specificity.

LLM grounding and the discovery hallucination boundary.
ELISA’s discovery mode, which prompts the LLM to separate dataset evidence from established biology and to propose hypotheses with probabilistic language, generated biologically plausible candidate signals in all six datasets (Table 4). These include the CALR, LRP1 phagocytic axis in cystic fibrosis macrophages, differential AP-1 family member usage in neuroblastoma therapy response, and a shared TFAP2B/LHX5/LHX1 regulatory module across inhibitory neuron subtypes in the developing brain. While these hypotheses require experimental validation, they illustrate the potential of grounded LLM reasoning to surface non-obvious patterns in complex datasets.

However, a strict separation between data-derived evidence and LLM-generated interpretation is essential. Without it, the LLM would inevitably introduce plausible-sounding but unsupported claims a risk that is particularly acute in biology, where prior knowledge is vast and contextual. ELISA’s prompt architecture addresses this by providing the LLM only with retrieved cluster data, gene statistics, and pathway results as context, with explicit instructions to avoid external literature and causal claims.

Future directions.
Several extensions can strengthen and broaden ELISA’s capabilities. Integration with spatial transcriptomics data would enable spatially resolved interaction prediction, addressing the current limitation of expression-only interaction scoring. Incorporation of trajectory inference methods would allow ELISA to reason about dynamic processes such as differentiation and therapy response. Expansion of the retrieval engine to support cross-dataset queries comparing cell types across tissues or disease states would enable the kind of meta-analytical reasoning that was outside ELISA’s scope in the ICB dataset evaluation. Finally, replacing the fixed LLM with a fine-tuned model trained on single-cell biological reasoning can improve the specificity and depth of automated interpretations.

5Conclusion.
ELISA demonstrates that explicit modality routing, rather than implicit contrastive fusion, provides a more robust foundation for multimodal single-cell retrieval. By maintaining separate semantic and expression pipelines and combining them through adaptive query classification, ELISA achieves consistently superior performance across both natural language and gene-signature queries. The integration of analytical modules and grounded LLM interpretation within a single interactive framework bridges the gap between data exploration and biological discovery, enabling researchers to move from raw atlas data to structured biological hypotheses within a single session. As single-cell datasets continue to grow in scale and complexity, systems that combine the complementary strengths of language models and expression-aware retrieval will be essential for translating transcriptomic data into biological understanding.

6Conflicts of interest
The authors declare that they have no competing interests.

7Funding
Computational resources are furnished by Dr. Antonio Orvieto, PI at Max Planck Institute for Intelligent Systems. The rest of the work is self-financed

8Data availability
All six single-cell RNA sequencing datasets used in this study are publicly available through CZ CELLxGENE Discover (https://cellxgene.cziscience.com): cystic fibrosis airways Berg et al. (2025), high-risk neuroblastoma Yu et al. (2025), immune checkpoint blockade multi-cancer Gondal et al. (2025), fetal lung AT2 organoids Lim et al. (2025), healthy breast tissue Bhat-Nakshatri et al. (2024), and first-trimester brain Mannens et al. (2025). Datasets were downloaded in AnnData (.h5ad) format. Source code available at https://github.com/omaruno/ELISA-An-AI-Agent-for-Expression-Grounded-Discovery-in-Single-Cell-Genomics.

9Author contributions statement
Omar Coser performed everything present in this manuscript. A preliminary version of this work appeared at the ICLR 2025 Workshop on Generative AI for Genomics, and MLGenX Coser (2026a, b). If you intend to use the script of ELISA cite this work.

10Acknowledgments
The authors acknowledge Dr. Antonio Orvieto for allowing to use computational resources of his Lab.

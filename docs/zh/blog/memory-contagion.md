# Memory Contagion: When AI Agents Remember Bias

Can bias spread through time via AI agent memory? We found that it can -- but only in certain models.

## The Question

AI agents increasingly use memory systems to maintain long-term coherence. But what if the memories they store are biased? Does that bias persist and propagate to future decisions?

## The Experiment

We tested three models (DeepSeek V4-Chat, V4-Pro, Claude 4.6) with two types of bias (length preference and authority bias) across four experimental phases.

## Key Findings

**Bias persists even with perfect memory consolidation.** Even when we used an "oracle" consolidation that preserves all information without loss, length bias still propagated to future agents. This means the problem isn't in how memories are merged -- it's in the biased content itself.

**It depends on the model generation.** Length bias propagated strongly in DeepSeek V4-Chat (Gamma_A = 13.18) but completely failed in both V4-Pro (Gamma_A = 0.00) and Claude 4.6 (Gamma_A = 0.00). Newer models appear immune.

**There is no safe threshold.** Contagion was detectable at contamination rates as low as 20%. Even small amounts of biased data can influence future behavior.

**It depends on the bias type.** Authority bias failed to propagate in all three models across 15 controlled multi-seed runs. Only certain bias types trigger contagion.

## Why It Matters

As AI agents are deployed in high-stakes environments, their reliance on long-term memory makes them susceptible to "historical" biases. Simply improving memory consolidation is not enough if the input experiences are already tainted.

## Paper

[arXiv 2606.23195](https://arxiv.org/abs/2606.23195) | TMLR #56

import type {
  Approval,
  ApprovalOptions,
  ApprovalsBlock,
  IdentityRef,
} from '../raw.js';

/** Convenience constructor: a single approver by display name or UPN. */
export interface ApprovalSpec {
  /** UPN, group name, or display name. Resolved server-side. */
  approvers: Array<string | IdentityRef>;
  /** 0 = all approvers required (default). */
  requiredApproverCount?: number;
  releaseCreatorCanBeApprover?: boolean;
  timeoutInMinutes?: number;
  executionOrder?: ApprovalOptions['executionOrder'];
}

/** Build an {@link ApprovalsBlock} for `preDeployApprovals` / `postDeployApprovals`. */
export function approval(spec: ApprovalSpec): ApprovalsBlock {
  const approvals: Approval[] = spec.approvers.map((a, i) => ({
    rank: i + 1,
    isAutomated: false,
    isNotificationOn: true,
    approver: typeof a === 'string' ? { displayName: a, uniqueName: a } : a,
  }));
  const options: ApprovalOptions = {
    requiredApproverCount: spec.requiredApproverCount ?? 0,
    releaseCreatorCanBeApprover: spec.releaseCreatorCanBeApprover ?? false,
    timeoutInMinutes: spec.timeoutInMinutes ?? 0,
    executionOrder: spec.executionOrder ?? 'beforeGates',
  };
  return { approvals, approvalOptions: options };
}

/** Sentinel "no approval required" block, the Azure default for new environments. */
export function noApproval(): ApprovalsBlock {
  return {
    approvals: [{ rank: 1, isAutomated: true, isNotificationOn: false }],
  };
}
